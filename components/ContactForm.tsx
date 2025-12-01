'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import FadeInDiv from './FadeInDiv'; 

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('idle');

    // !!! В реальном проекте: здесь будет API-запрос к вашему CRM/Backend
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Имитация успешной отправки
      setSubmissionStatus('success'); 
      setFormData({ name: '', phone: '', message: '' });

      // Очистка статуса через 5 секунд
      setTimeout(() => setSubmissionStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contacts" className="section-container bg-primary/95 text-white">
      <FadeInDiv>
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Начните работу с ФФ24 сегодня
        </h3>
        <p className="text-center text-lg text-white/70 mb-12">
          Заполните форму, и наш менеджер свяжется с вами в течение 15 минут для обсуждения деталей.
        </p>
      </FadeInDiv>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Колонка 1: Контакты и адреса */}
        <FadeInDiv className="lg:col-span-1 space-y-8 p-6 bg-primary rounded-xl shadow-2xl">
          <h4 className="text-2xl font-bold border-b border-accent/50 pb-3">Контактная информация</h4>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <Phone className="w-5 h-5 mr-3 mt-1 text-accent flex-shrink-0" />
              <div>
                <span className="font-semibold block">Телефон:</span>
                <a href="tel:+74950000000" className="text-white/80 hover:text-accent transition-colors">+7 (495) 000-00-00</a>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="w-5 h-5 mr-3 mt-1 text-accent flex-shrink-0" />
              <div>
                <span className="font-semibold block">Email:</span>
                <a href="mailto:info@ff24.ru" className="text-white/80 hover:text-accent transition-colors">info@ff24.ru</a>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 mt-1 text-accent flex-shrink-0" />
              <div>
                <span className="font-semibold block">Адрес склада:</span>
                <p className="text-white/80">
                  Москва, ул. Складская, 24 (схема проезда — по запросу)
                </p>
              </div>
            </div>
          </div>
        </FadeInDiv>

        {/* Колонка 2: Форма */}
        <FadeInDiv delay={200} className="lg:col-span-2 p-8 bg-white text-content rounded-xl shadow-2xl">
          <h4 className="text-2xl font-bold mb-6 text-primary">Отправить заявку</h4>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Ваше имя</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">Телефон (обязательно)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                // В реальном проекте: здесь будет маска ввода
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">Сообщение или детали заказа</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`neon-button w-full text-lg flex items-center justify-center 
                          ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
              <Send className="w-5 h-5 ml-2" />
            </button>
            
            {submissionStatus === 'success' && (
              <p className="text-green-600 font-semibold text-center mt-3">
                Спасибо! Ваша заявка успешно отправлена.
              </p>
            )}
          </form>
        </FadeInDiv>
      </div>
    </section>
  );
};

export default ContactForm;
