import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod'; // Імпортуємо Zod
import cn from 'classnames';
import { authService } from '../services/authService';
import { AuthContext } from './AuthContext';

// 1. Створюємо схему валідації (Правила для полів)
const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, 'Будь ласка, введіть поточний пароль'),
    newPassword: z.string().min(6, 'Пароль має містити щонайменше 6 символів'),
    confirmPassword: z.string().min(1, 'Підтвердіть новий пароль'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    // Ця перевірка гарантує, що паролі співпадають
    message: 'Паролі не співпадають',
    path: ['confirmPassword'], // Де показати помилку
  });

export const PasswordChangeModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  // 2. Ініціалізуємо React Hook Form
  const {
    register, // функція для "підключення" інпутів
    handleSubmit, // обробник відправки
    reset, // функція для очищення форми
    setError,
    formState: { errors, isSubmitting }, // стан помилок та завантаження
  } = useForm({
    resolver: zodResolver(passwordSchema), // підключаємо Zod
  });

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    reset(); // Очищаємо форму при закритті
  };

  const onSubmit = async data => {
    const payload = {
      ...data,
      email: user.email,
    };
    console.log(payload);

    try {
      await authService.changePassword(payload);
      closeModal();
    } catch (error) {
      if (error.response?.data?.message) {
        setError('oldPassword', { message: error.response.data.message });
      }
    }
  };

  return (
    <div>
      <button className="button is-primary" onClick={openModal}>
        Змінити пароль
      </button>

      <div className={cn('modal', { 'is-active': isModalOpen })}>
        <div className="modal-background" onClick={closeModal}></div>

        <div className="modal-content">
          <div className="box">
            <h2 className="title is-4">Зміна пароля</h2>

            {/* Використовуємо звичайний HTML form та handleSubmit */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="field">
                <label className="label">Поточний пароль</label>
                <div className="control">
                  {/* Підключаємо інпут через {...register('ім'я_поля')} */}
                  <input
                    type="password"
                    className={cn('input', { 'is-danger': errors.oldPassword })}
                    placeholder="Введіть старий пароль"
                    {...register('oldPassword')}
                  />
                </div>
                {/* Виводимо помилку, якщо вона є */}
                {errors.oldPassword && (
                  <p className="help is-danger">{errors.oldPassword.message}</p>
                )}
              </div>

              <div className="field">
                <label className="label">Новий пароль</label>
                <div className="control">
                  <input
                    type="password"
                    className={cn('input', { 'is-danger': errors.newPassword })}
                    placeholder="Введіть новий пароль"
                    {...register('newPassword')}
                  />
                </div>
                {errors.newPassword && (
                  <p className="help is-danger">{errors.newPassword.message}</p>
                )}
              </div>

              <div className="field">
                <label className="label">Підтвердіть новий пароль</label>
                <div className="control">
                  <input
                    type="password"
                    className={cn('input', {
                      'is-danger': errors.confirmPassword,
                    })}
                    placeholder="Повторіть новий пароль"
                    {...register('confirmPassword')}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="help is-danger">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="field is-grouped mt-5">
                <div className="control">
                  <button
                    type="submit"
                    className={cn('button is-success', {
                      'is-loading': isSubmitting,
                    })}
                  >
                    Зберегти
                  </button>
                </div>
                <div className="control">
                  <button
                    type="button"
                    className="button is-light"
                    onClick={closeModal}
                  >
                    Скасувати
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={closeModal}
        ></button>
      </div>
    </div>
  );
};
