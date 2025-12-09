import WorkerIllustration from "@/components/login/WorkerIllustration";
import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 px-10">
      <div className="flex items-center gap-24 max-w-7xl w-full">

        {/* Грузчик слева */}
        <WorkerIllustration />

        {/* Форма справа */}
        <LoginForm />
      </div>
    </div>
  );
}
