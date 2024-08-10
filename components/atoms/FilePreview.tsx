'use client';

import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Download from 'yet-another-react-lightbox/plugins/download';
import { useGetDocumentFile } from '@/services/digital-library/query';
import 'yet-another-react-lightbox/styles.css';
import { ClipLoader } from 'react-spinners';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  file?: {
    fileName?: string;
    src: string;
    type?: string;
    download?: {
      filename?: string;
      url?: string;
    };
  }[];
}

export default function FilePreview({ file, isOpen, setIsOpen }: Readonly<Props>) {
  const fileData = file !== undefined && file.length > 0 ? file[0] : undefined;

  const { data: pdfBlob, isLoading } = useGetDocumentFile(
    fileData?.fileName ?? '',
    fileData !== undefined && fileData.type === 'document'
  );
  const [pdfUrl, setPdfUrl] = useState<string>();

  useEffect(() => {
    if (pdfBlob) {
      const blobData = new Blob([pdfBlob], {
        type: 'application/pdf',
      });

      const url = URL.createObjectURL(blobData);
      setPdfUrl(url);

      // Cleanup the object URL when the component unmounts
      return () => URL.revokeObjectURL(url);
    }
  }, [pdfBlob]);

  const renderSlideContent = useCallback(
    ({ slide }: any) => {
      if (slide.type === 'document' && pdfUrl) {
        return isLoading ? (
          <ClipLoader
            color={'#FFFFFF'}
            loading={isLoading}
            size={150}
            aria-label='Loading Spinner'
            data-testid='loader'
            className='block'
          />
        ) : (
          <iframe src={pdfUrl + '#toolbar=0'} width='90%' height='90%' title='Preview'>
            <p>
              {"It appears you don't have a PDF plugin for this browser. You can"}{' '}
              <a href={pdfUrl}>click here to download the PDF file.</a>
            </p>
          </iframe>
        );
      }

      return undefined;
    },
    [pdfUrl, isLoading]
  );

  return (
    <Lightbox
      open={isOpen}
      close={() => setIsOpen((prev) => !prev)}
      slides={file as any}
      plugins={[Download, Zoom]}
      carousel={{
        finite: true,
      }}
      zoom={{ maxZoomPixelRatio: 2 }}
      render={{
        slide: (slide) => renderSlideContent(slide),
        buttonPrev: () => null,
        buttonNext: () => null,
      }}
      className='lightbox-container'
    />
  );
}
