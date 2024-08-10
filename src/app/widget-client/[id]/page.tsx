import WidgetChatbot from '@components/widget';

export default function TenantWidgetPage({ params }: { params: { id: string } }) {
  if (!params.id) {
    return <p>Loading...</p>;
  }

  return <WidgetChatbot tenantId={params.id as string} />;
}
