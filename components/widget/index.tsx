'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import images from '@/assets/images';
import { IconButton, TextareaAutosize } from '@mui/material';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import InputForm from '../form/InputForm';
import InputEmailForm from '../form/InputEmailForm';
import InputPhoneForm from '../form/InputPhoneForm';
import Button from '../atoms/Button';
import { encryptAES } from '@/utils/helper/CryptoJS';
import {
  usePostContinueConversation,
  usePostConversation,
  usePostTimeoutConversation,
} from '@/services/conversation/mutation';
import { UAParser } from 'ua-parser-js';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import { API_URL_PREVIEW_FILE, API_URL_WEBSOCKET } from '@/utils/environment';
import FilePreview from '@/components/atoms/FilePreview';
import Stomp, { Client, Message } from 'webstomp-client';
import SockJS from 'sockjs-client';
import { Chat } from '@/interfaces/chat';
import { useGetCustomerCarousell } from '@/services/carousell/query';
import { ICarousell } from '@/interfaces/carousell';
import Link from 'next/link';
import CardGridWidget from '../atoms/CardGridWidget';
import { IResponseContinueConversation, IResponseCreateConversation } from '@/interfaces/covnersation';
import icons from '@/assets/icons';

interface Props {
  tenantId: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Must Filled !'),
  email: Yup.string().email('Email must be a valid email').required('Must Filled!'),
  phoneNumber: Yup.string().required('Must Filled!'),
  chat: Yup.string(),
});

export default function WidgetChatbot({ tenantId }: Readonly<Props>) {
  const [stompClient, setStompClient] = useState<Client | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [section, setSection] = useState<string>('login');
  const [conversation, setConversation] = useState<IResponseCreateConversation[] | null>(null);
  const [isOpenImage, setIsOpenImage] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>();
  const [currentCustomer, setCurrentCustomer] = useState<{ name: string; email: string; phoneNumber: string }>();
  const [continueConversation, setContinueConversation] = useState<IResponseContinueConversation>();
  const [agentId, setAgentId] = useState<string>();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const conversationContainerRef = useRef<HTMLDivElement>(null);

  const parser = new UAParser();
  const resultParser = parser.getResult();

  const { mutate: mutateCreateConversation } = usePostConversation();
  const { mutate: mutateContinueConversation } = usePostContinueConversation();
  const { mutate: mutateTimeoutConversation } = usePostTimeoutConversation();

  const { data: carousellData } = useGetCustomerCarousell(
    {
      tenantId: tenantId,
    },
    isLogin
  );

  const { handleSubmit, control, watch, setValue, register } = useForm<any>({
    mode: 'all',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
    },
  });

  const onSubmitLoginConversation = () => {
    setIsLoading(true);

    const create = {
      name: watch('name'),
      email: encryptAES(watch('email')),
      phoneNumber: encryptAES(`62${watch('phoneNumber')}`),
      channel: 'web',
      tenantId: tenantId,
    };

    mutateCreateConversation(create, {
      onSuccess: (data) => {
        if (data?.data) {
          setCurrentCustomer({ ...create });
          const tempId = new Date().getTime().toString();
          const requestDate = new Date().toLocaleTimeString('en-US', {
            timeZone: 'Asia/Jakarta',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });

          setConversation([
            {
              conversationId: tempId,
              response: 'typing',
              request: `Halo, perkenalkan nama saya ${create?.name}`,
              requestDate,
            },
          ]);

          setTimeout(() => {
            const responseDate = new Date().toLocaleTimeString('en-US', {
              timeZone: 'Asia/Jakarta',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            });

            if (data?.data) {
              const conv = { ...data.data, responseDate, requestDate };
              setConversation([conv]);
              setIsLogin(true);
              setSection('chatting');
              setIsLoading(false);
            }
          }, 800);
        }
      },
      onError: () => {
        setIsLoading(false);
        alert('tidak bisa create conversation');
      },
    });
  };

  const onContinueConversation = () => {
    if (watch('chat') === '' || watch('chat') === undefined) return;

    // When the websocket is connected and there is an agent serving, the message is sent directly via the websocket
    if (agentId !== undefined && continueConversation !== undefined) {
      onSendMessageWs();

      return;
    }

    const lastConversationId =
      conversation && conversation.length > 0 ? conversation[conversation.length - 1].conversationId : '';

    const create = {
      tenantId: tenantId,
      conversationId: lastConversationId,
      chat: watch('chat'),
      userAccess: `${resultParser?.ua} ${resultParser?.browser?.name}/${resultParser?.browser?.version}`,
    };

    setValue('chat', '');

    const isRequestToAgent = create.chat.toLowerCase() === 'live agent' || create.chat.toLowerCase() === 'cs';
    const tempId = new Date().getTime().toString();

    const requestDate = new Date().toLocaleTimeString('en-US', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    setConversation((prevConversations: any) => {
      if (prevConversations) {
        return [
          ...prevConversations,
          {
            conversationId: isRequestToAgent ? 'waiting-agent' : tempId,
            response: 'typing',
            request: create.chat,
            requestDate,
          },
        ];
      }
      return [
        {
          conversationId: isRequestToAgent ? 'waiting-agent' : tempId,
          response: 'typing',
          request: create.chat,
          requestDate,
        },
      ];
    });

    mutateContinueConversation(create, {
      onSuccess: (data) => {
        if (data?.data) {
          if (data.data.request.toLowerCase() === 'live agent' || data.data.request.toLowerCase() === 'cs') {
            setContinueConversation(data.data);

            return;
          }

          setTimeout(() => {
            const responseDate = new Date().toLocaleTimeString('en-US', {
              timeZone: 'Asia/Jakarta',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            });

            const resData: IResponseContinueConversation = data?.data!;

            const newData = {
              ...resData,
              responseDate,
              requestDate,
            };

            setConversation((prevConversations: any) => {
              return prevConversations.map((conv: any) => (conv.conversationId === tempId ? newData : conv));
            });
            setTimeLeft(resData?.timeoutTime);
          }, 800);
        }
      },
      onError: () => {
        setTimeout(() => {
          const responseDate = new Date().toLocaleTimeString('en-US', {
            timeZone: 'Asia/Jakarta',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });

          setConversation((prevConversations: any) => {
            return prevConversations.map((conv: any) =>
              conv.conversationId === tempId
                ? { ...conv, request: 'Maaf conversation sedang tidak bisa digunakan', responseDate, requestDate }
                : conv
            );
          });
        }, 800);
      },
    });
  };

  const onSendMessageWs = () => {
    // send realtime message
    // the empty agentId & continueConversation have been checked in onContinueConversation
    if (stompClient) {
      const payload: Chat = {
        senderId: continueConversation!.conversationId,
        receiverId: agentId!,
        senderName: currentCustomer?.name ?? 'Customer',
        message: watch('chat')?.trim(),
        isLiveAgent: false,
        status: 'MESSAGE',
      };

      const tempId = new Date().getTime().toString();

      const requestDate = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      setConversation((prevConversations: any) => {
        if (prevConversations) {
          return [
            ...prevConversations,
            { conversationId: tempId, response: '', request: payload.message, requestDate },
          ];
        }
        return [{ conversationId: tempId, response: '', request: payload.message, requestDate }];
      });

      // console.log('is connected', stompClient)
      stompClient?.send('/app/private-message', JSON.stringify(payload));

      setValue('chat', '');
    }
  };

  const onPrivateMessage = (payload: Message) => {
    const chatData: Chat = JSON.parse(payload.body);

    const newMesage = {
      conversationId: chatData.receiverId,
      request: '',
      response:
        chatData.message === 'BUCKET_CLOSED' ? 'Anda sudah tidak terhubung dengan agent kami.' : chatData.message,
      responseDate: new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
    };

    setConversation((prev) => {
      if (prev !== null) {
        let isUpdate = false;
        const newV = prev.map((it) => {
          if (it.conversationId === 'waiting-agent') {
            isUpdate = true;

            it = {
              ...newMesage,
              request: it.request,
              requestDate: it.requestDate,
            };
          }

          return it;
        });

        if (!isUpdate) {
          newV.push(newMesage);
        }

        return newV;
      }

      return [newMesage];
    });

    // ticket was closed by agent
    if (chatData.message === 'BUCKET_CLOSED') {
      setAgentId(undefined);
      setContinueConversation(undefined);
    } else {
      setAgentId(chatData.senderId);
    }
  };

  const scrollToBottom = () => {
    if (conversationContainerRef.current)
      (conversationContainerRef.current as HTMLElement).scrollTop = conversationContainerRef.current.scrollHeight;
  };

  // open websocket connection after customer sends "live agent" message
  useEffect(() => {
    let stompTmp: Client | undefined = undefined;

    const disconnectWsConnection = () => {
      setAgentId(undefined);
      setContinueConversation(undefined);
      if (stompTmp?.connected) {
        stompTmp.disconnect();
        setStompClient(undefined);
      }
    };

    if (stompClient !== undefined && continueConversation === undefined) {
      return () => {
        disconnectWsConnection();
      };
    }

    if (continueConversation === undefined) {
      return;
    }

    const onConnected = () => {
      if (stompTmp?.connected) {
        setStompClient(stompTmp);
        stompTmp?.subscribe('/user/' + continueConversation.conversationId + '/private', onPrivateMessage);
      }
    };

    const stompFailureCallback = () => {
      setStompClient(undefined);
      setTimeout(connect, 3000);
      // console.log('STOMP: Reconecting in 3 seconds')
    };

    const connect = () => {
      const Sock = new SockJS(API_URL_WEBSOCKET);

      stompTmp = Stomp.over(Sock);

      stompTmp.debug = () => {};

      stompTmp?.connect({}, onConnected, stompFailureCallback);
    };

    connect();

    return () => {
      disconnectWsConnection();
    };
  }, [continueConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => Math.max(0, (prevTimeLeft ?? 0) - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    if (conversation && conversation.length > 1 && timeLeft == 0) {
      const lastConversationId = conversation[conversation.length - 1].conversationId;
      const tempId = new Date().getTime().toString();
      const responseDate = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      mutateTimeoutConversation(
        { conversationId: lastConversationId },
        {
          onSuccess: (data) => {
            setConversation((prevConversations: any) => {
              return [
                ...prevConversations,
                {
                  conversationId: tempId,
                  response: data?.data,
                  request: null,
                  requestDate: null,
                  responseDate,
                },
              ];
            });
            setIsDisabled(true);
          },
          onError: () => {
            alert('timeout conversation erro');
          },
        }
      );
    }
  }, [timeLeft]);

  const KeyEnter = (event: any) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();

      onContinueConversation();
    }
  };

  const ResponseChat = ({ response }: { response: string }) => {
    const renderResponseChat = (text: any) => {
      const parts = text
        .split(/(\*.*?\*|\r?\n|\n|https?:\/\/\S+|www\.[^\s.]+(?:\.[^\s.]+)*|acc\.co\.id[^\s]*)/)
        .filter(Boolean);

      const urlPattern = /\bhttps?:\/\/\S+|\bwww\.\S+|\bacc\.co\.id\S*/;

      return parts?.flatMap((part: any, index: any) => {
        if (part === '\r\n' || part === '\n' || part === '.\n') {
          return <br key={index} />;
        } else if (part.startsWith('*') && part.endsWith('*')) {
          const buttonText = part.slice(1, -1);
          return (
            <IconButton
              sx={{
                backgroundColor: '#22356F',
                padding: '6px 12px',
                borderRadius: '6px',
                marginTop: '4px',
                marginBottom: '8px',
                '&:hover': {
                  backgroundColor: '#22356F',
                  opacity: '0.9',
                },
              }}
              key={index}
              onClick={() => {
                if (!isDisabled) {
                  setValue('chat', buttonText);
                  onContinueConversation();
                }
              }}
            >
              <p className='text-xs text-neutral10'>{buttonText}</p>
            </IconButton>
          );
        } else if (urlPattern.test(part)) {
          let linkText = part;
          let additionalText = '';
          let url = part;

          if (part.endsWith(')')) {
            const lastIndex = part.lastIndexOf(')');
            linkText = part.substring(0, lastIndex);
            additionalText = ')';

            if (!linkText.includes('https')) {
              url = `https://${linkText}`;
            } else {
              url = linkText;
            }
          } else if (part.endsWith('.')) {
            const lastIndex = part.lastIndexOf('.');
            linkText = part.substring(0, lastIndex);
            additionalText = '.';

            if (!linkText.includes('https')) {
              url = `https://${linkText}`;
            } else {
              url = linkText;
            }
          } else if (part.endsWith(',')) {
            const lastIndex = part.lastIndexOf(',');
            linkText = part.substring(0, lastIndex);
            additionalText = ',';

            if (!linkText.includes('https')) {
              url = `https://${linkText}`;
            } else {
              url = linkText;
            }
          } else {
            if (!linkText.includes('https')) {
              url = `https://${linkText}`;
            }
          }

          return (
            <>
              <Link
                href={url}
                key={index}
                target='_blank'
                className=' text-blue-500 underline'
                rel='noopener noreferrer'
              >
                {linkText}
              </Link>
              <span className='text-neutral90 no-underline'>{additionalText}</span>
            </>
          );
        }
        return <span key={index}>{part}</span>;
      });
    };

    return <p className='text-xs text-neutral90 font-medium'>{renderResponseChat(response)}</p>;
  };

  const handleClickMenu = (carousellId: string) => {
    const lastConversationId =
      conversation && conversation.length > 0 ? conversation[conversation.length - 1].conversationId : '';

    setConversation((prevConversation) => {
      const newConversation = prevConversation ? [...prevConversation] : [];
      newConversation.push({ conversationId: lastConversationId, request: '', response: '', carousellId });
      return newConversation;
    });

    setIsMenuOpen(false);
  };

  const handleClickButtonCarousell = (chat: string) => {
    if (!isDisabled) {
      setValue('chat', chat);
      onContinueConversation();
    }
  };

  return (
    <section className={`z-50`}>
      {isOpen ? (
        <div className='w-[400px] widget-shadow'>
          {section == 'login' ? (
            <>
              <div className='flex justify-between items-center bg-primary'>
                <div className='flex gap-2 items-center pl-6 py-4'>
                  <Image src={images.LOGO} width={26} height={32} priority alt='logo' />
                  <h2 className='text-xl font-semibold text-neutral10'>CXplore SRM</h2>
                </div>
                <div className='flex gap-1 items-center pr-4'>
                  <IconButton onClick={() => setIsOpen(false)}>
                    <HorizontalRuleOutlinedIcon sx={{ width: 24, height: 24, color: '#ffffff', padding: 0 }} />
                  </IconButton>
                </div>
              </div>

              <form
                onSubmit={handleSubmit(onSubmitLoginConversation)}
                className='px-[60px] py-[77px] flex flex-col items-center bg-neutral10 gap-4'
              >
                <div className='flex items-center gap-2'>
                  <Image src={images.LOGO} width={26} height={32} priority alt='logo' />
                  <h1 className='text-[32px] leading-[48px] font-semibold text-primary'>Halo!</h1>
                </div>
                <p className='text-center text-[#667085] text-xs px-[11px]'>
                  Nice to see you, YUNA here!. By filling the form you agree to have your personal data processed as
                  described in our Privacy Policy
                </p>
                <InputForm
                  name='name'
                  control={control}
                  htmlFor='name'
                  label='Nama Lengkap'
                  defaultValue={''}
                  placeholder='Masukkan nama lengkap'
                  max={50}
                />
                <InputEmailForm
                  label='Alamat Email'
                  placeholder='example@mail.com'
                  htmlFor='email'
                  control={control}
                  name='email'
                  max={50}
                />
                <InputPhoneForm
                  label='Phone Number'
                  placeholder='Your Number'
                  htmlFor='phoneNumber'
                  control={control}
                  name='phoneNumber'
                  watchValue={watch('phoneNumber')}
                  max={15}
                />
                <Button
                  type='submit'
                  text='Mulai Percakapan'
                  className={`w-full mt-4 text-sm p-[11px] rounded-[6px] font-medium  hover:opacity-90 ${
                    isLoading ? 'text-neutral90 bg-neutral40' : 'text-neutral10  bg-primary'
                  }`}
                  loading={isLoading}
                />
              </form>
            </>
          ) : (
            <>
              <div className='flex justify-between items-center bg-primary'>
                <div className='flex gap-4 items-center pl-[25px] py-[18px]'>
                  {conversation?.[0]?.avatar ? (
                    <div className='bg-surface h-7 w-7 rounded-full flex items-center justify-center'>
                      <Image
                        src={`${API_URL_PREVIEW_FILE}/${conversation[0].avatar}`}
                        width={48}
                        height={48}
                        alt='logo'
                        objectFit='cover'
                        objectPosition='center'
                        className='w-7 h-7 p-[2px] rounded-full'
                      />
                    </div>
                  ) : (
                    <IconButton className='bg-surface border-surface border rounded-full h-7 w-7'>
                      <PersonOutlineOutlinedIcon sx={{ width: 24, height: 24, color: '#22356F' }} />
                    </IconButton>
                  )}

                  <div className='text-neutral10'>
                    <p className='text-sm font-semibold mb-[2px]'>{conversation?.[0]?.botName ?? 'YUNA Virtual'}</p>
                    <p className='text-xs'>Yuk tanyakan tentang layanan ACC disini</p>
                  </div>
                </div>

                <div className='flex gap-1 items-center pr-[17px]'>
                  <IconButton onClick={() => setIsOpen(false)}>
                    <HorizontalRuleOutlinedIcon sx={{ width: 24, height: 24, color: '#ffffff', padding: 0 }} />
                  </IconButton>
                </div>
              </div>
              <div className='bg-neutral10'>
                {agentId ? (
                  <div className='bg-neutral10'>
                    <div className='flex items-center px-5 py-[10px] gap-2 bg-gradient-widget'>
                      <span className='text-green-600'>●</span>
                      <p className='text-[10px] text-neutral10'>Anda sedang terhubung dengan Live Agent kami</p>
                    </div>
                  </div>
                ) : (
                  <div className='flex items-center px-[34px] py-[10px] gap-[10px] bg-gradient-widget'>
                    <InfoOutlinedIcon sx={{ width: 16, height: 16, color: '#ffffff' }} />
                    <p className='text-xs text-neutral10'>
                      {`Jawaban ${
                        conversation?.[0]?.botName ? conversation?.[0]?.botName.split(' ')[0] : 'YUNA'
                      } belum memuaskan? Ketik `}
                      <span className='font-semibold'>“CS”</span>
                      {` untuk terhubung dengan Live Agent kami`}
                    </p>
                  </div>
                )}
              </div>
              <div
                className='h-[400px] overflow-y-auto bg-neutral20 py-7 hide-scrollbar'
                ref={conversationContainerRef}
              >
                {conversation?.map((e, i) => {
                  const reqLines = e.request?.split(/\r\n|\n/);
                  return (
                    <React.Fragment key={i}>
                      {e.carousellId && (
                        <div key={e.carousellId + i}>
                          <CardGridWidget
                            type='customer'
                            handleClick={handleClickButtonCarousell}
                            data={carousellData?.data?.filter((cd) => e.carousellId == cd.carousellId)[0]!}
                          />
                        </div>
                      )}
                      <div key={e.conversationId + i} className='w-full flex flex-col items-center'>
                        {e.request && (
                          <div className='mr-2 my-4 flex flex-col justify-end self-end items-end'>
                            <div className=' bg-[#EDF1FF] px-4 py-3 border-[#BEC8E4] border-[0.5px] rounded-[16px] rounded-br-none max-w-[360px]'>
                              <p className='text-xs text-primary font-medium'>
                                {reqLines?.map((line) => (
                                  <>
                                    {line}
                                    <br />
                                  </>
                                ))}
                              </p>
                            </div>
                            <p className='text-neutral60 text-xs leading-[30px]'>{e.requestDate}</p>
                          </div>
                        )}
                        {e.response && (
                          <div className='mx-[20px] self-start flex flex-col justify-end'>
                            <div className={`flex gap-2 mb-1 ${e.fileType && e.filePath && 'flex-wrap'}`}>
                              {conversation[0]?.avatar ? (
                                <div className='bg-surface h-7 w-7 rounded-full flex items-center justify-center'>
                                  <Image
                                    src={`${API_URL_PREVIEW_FILE}/${conversation[0].avatar}`}
                                    width={48}
                                    height={48}
                                    alt='logo'
                                    objectFit='cover'
                                    objectPosition='center'
                                    className='w-6 h-6 rounded-full'
                                  />
                                </div>
                              ) : (
                                <IconButton className='bg-surface border-surface border rounded-full h-7 w-7'>
                                  <PersonOutlineOutlinedIcon sx={{ width: 24, height: 24, color: '#22356F' }} />
                                </IconButton>
                              )}
                              <div className='flex flex-col gap-2'>
                                {e.fileType && e.filePath && (
                                  <div className='flex gap-2 mb-1 self-start'>
                                    <div className='rounded-[16px] rounded-tl-none max-w-[310px] bg-[#FFFFFF] border border-[#E3E3E3] px-4 py-3'>
                                      {e.fileType == 'Document' ? (
                                        <IconButton
                                          sx={{
                                            backgroundColor: '#ffffff',
                                            '&:hover': {
                                              backgroundColor: '#ffffff',
                                            },
                                          }}
                                          href={`${API_URL_PREVIEW_FILE}/${e.filePath}`}
                                          className='text-xs text-neutral90 font-medium flex items-center gap-1 p-0'
                                        >
                                          <Image
                                            src={icons.PDF}
                                            width={160}
                                            height={180}
                                            alt='icons pdf'
                                            className='h-[18px] w-[16px]'
                                          />

                                          {e.filePath.split('/').pop()}
                                          <GetAppOutlinedIcon sx={{ width: '16px', height: '16px' }} />
                                        </IconButton>
                                      ) : (
                                        <>
                                          <Image
                                            src={`${API_URL_PREVIEW_FILE}/${e.filePath}`}
                                            width={100}
                                            height={120}
                                            alt={e.filePath.split('/').pop()!}
                                            objectFit='cover'
                                            objectPosition='center'
                                            onClick={() => setIsOpenImage(true)}
                                            className='cursor-pointer'
                                          />

                                          <FilePreview
                                            file={[
                                              {
                                                src: `${API_URL_PREVIEW_FILE}/${e.filePath}`,
                                                type: e.fileType?.toLowerCase(),
                                                download: {
                                                  filename: `${e.filePath.split('/').pop()}`,
                                                  url: `${API_URL_PREVIEW_FILE}/${e.filePath}`,
                                                },
                                              },
                                            ]}
                                            isOpen={!!isOpenImage}
                                            setIsOpen={() => setIsOpenImage(false)}
                                          />
                                        </>
                                      )}
                                    </div>
                                  </div>
                                )}

                                <div
                                  className={`rounded-[16px] rounded-tl-none w-fit max-w-[310px] bg-[#FFFFFF] border border-[#E3E3E3] px-4 py-3`}
                                >
                                  {e.response === 'typing' ? (
                                    <p className='text-xs text-neutral90 font-medium'>
                                      <span>
                                        {e.conversationId === 'waiting-agent' ? 'Sedang menunggu agent' : 'Typing'}
                                      </span>
                                      <span className='typing'>
                                        <span>.</span>
                                        <span>.</span>
                                        <span>.</span>
                                        <span>.</span>
                                        <span>.</span>
                                      </span>
                                    </p>
                                  ) : (
                                    <ResponseChat response={e.response} key={i} />
                                  )}
                                </div>
                              </div>
                            </div>
                            <p className='ml-9 text-neutral60 text-xs leading-[30px]'>
                              {e.responseDate} {isDisabled && i === conversation.length - 1 && '- Timeout'}
                            </p>
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
              <div className='bg-neutral10 p-6 flex flex-col gap-4 custom1'>
                {isMenuOpen && (
                  <div className='absolute max-h-[250px] max-w-[325px] overflow-y-auto flex flex-col bottom-[90px] bg-neutral10 px-[6px] py-[12px] w-full shadow-custom1 rounded-[6px] scrollbar-thin z-50'>
                    <p className='text-neutral60 text-xs px-4 py-[6px]'>CHOOSE MENU</p>
                    {carousellData?.data?.map((e: ICarousell) => (
                      <button
                        onClick={() => handleClickMenu(e.carousellId)}
                        key={e.carousellId}
                        className='text-sm px-4 py-[14px] text-left hover:bg-surface cursor-pointer'
                      >
                        {e?.title}
                      </button>
                    ))}
                  </div>
                )}
                <div className='flex justify-between items-end bg-[#EDF1FF] py-[7.5px] px-[14px] rounded-[8px]'>
                  <div className='flex-1 flex items-end'>
                    <IconButton
                      disabled={isDisabled || (!agentId && continueConversation !== undefined)}
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className='bg-primary rounded-[6px] px-3 py-[6px] mb-1 hover:bg-primary hover:opacity-90 text-neutral10 text-xs font-medium'
                    >
                      Menu
                    </IconButton>
                    <TextareaAutosize
                      autoFocus
                      maxRows={4}
                      {...register('chat', { required: true })}
                      placeholder='Type here...'
                      className='w-full flex-1 hide-scrollbar bg-transparent outline-none p-2 ml-2 resize-none text-sm placeholder:text-xs placeholder:pt-[2px]'
                      onKeyDown={KeyEnter}
                      disabled={isDisabled || (!agentId && continueConversation !== undefined)}
                    />
                  </div>
                  <IconButton
                    onClick={() => onContinueConversation()}
                    // disbale when waiting first message from agent
                    disabled={isDisabled || (!agentId && continueConversation !== undefined)}
                  >
                    <SendOutlinedIcon
                      sx={{
                        width: 20,
                        height: 20,
                        color: isDisabled || (!agentId && continueConversation !== undefined) ? '' : '#22356F',
                      }}
                    />
                  </IconButton>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <IconButton
          sx={{ backgroundColor: '#22356F' }}
          className='h-16 w-16 rounded-full hover:bg-primary hover:opacity-80 flex items-center justify-center z-20 cursor-pointer'
          onClick={() => setIsOpen(true)}
        >
          <ChatOutlinedIcon sx={{ width: 32, height: 32, color: '#ffffff' }} />
        </IconButton>
      )}
    </section>
  );
}
