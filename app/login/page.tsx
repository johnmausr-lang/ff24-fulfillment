// app/login/page.tsx (УЖЕ ИЗМЕНЕННЫЙ КОД, но с реальным API-вызовом)

// ... (импорты: useState, useRouter, Link, User, Lock, ArrowRight, Loader2)
// (Добавляем импорт axios или используем fetch)

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Пароль не используется для МС, но оставим для формы
  // ... (isLoading, error, router)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
        // --- ЗАМЕНА MOCK-ЛОГИКИ НА РЕАЛЬНЫЙ API-ВЫЗОВ ---
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: email, email: email }) // Отправляем phone или email
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message || 'Ошибка входа. Проверьте данные.');
            return;
        }

        // Успешный вход: сохраняем токен
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('counterpartyId', data.counterpartyId);
        
        console.log('Успешный вход! Перенаправление...');
        router.push('/dashboard');
        
    } catch (e) {
        setError('Не удалось подключиться к серверу.');
    } finally {
        setIsLoading(false);
    }
  };

  // ... (остальной JSX-код формы)
};

export default LoginPage;
