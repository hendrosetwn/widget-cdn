import WidgetClient from '@components/widget';

export default function TenantWidgetPage({ params }: { params: { id: string } }) {
  if (!params.id) {
    return <p>Loading...</p>;
  }

  return <WidgetClient tenantId={params.id as string} />;
}
