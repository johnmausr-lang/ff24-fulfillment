import WorkerAnimation from "@/components/login/WorkerAnimation";
import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 px-6">
      <div className="flex flex-col md:flex-row gap-16 items-center max-w-5xl w-full">
        <WorkerAnimation />
        <LoginForm />
      </div>
    </div>
  );
}
