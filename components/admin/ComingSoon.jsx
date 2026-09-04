import Card from "@/components/ui/Card";

export default function ComingSoon({ title, phase }) {
  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-semibold text-charcoal">{title}</h1>
      <Card className="text-ink">
        <p className="text-sm text-muted">
          Este módulo se construye en la {phase} del proyecto CRM. La navegación y los permisos
          ya están activos — el contenido llega en el siguiente paso.
        </p>
      </Card>
    </div>
  );
}
