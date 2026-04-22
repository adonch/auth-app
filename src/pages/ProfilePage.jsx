import { useContext } from 'react';
import './styles.scss';
import { AuthContext } from '../components/AuthContext';
// import { PasswordChangeModal } from '../components/PasswordChangeModal'; // Розкоментуйте, якщо використовуєте

export const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  const initials = user?.name ? user.name.substring(0, 2).toUpperCase() : 'EW';

  return (
    <section id="profile" className="page page-animate">
      <div className="section-header">
        <h1 className="section-title">Profile Settings</h1>
        <p className="section-desc">
          Manage your personal information and how it's displayed.
        </p>
      </div>

      <div className="card">
        <div className="avatar-upload">
          <div className="avatar-lg">{initials}</div>
          <div>
            <button
              className="btn btn-secondary"
              style={{ marginBottom: '8px' }}
            >
              Upload new picture
            </button>
            <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
              JPG, GIF or PNG. Max size of 800K.
            </p>
          </div>
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-input"
              defaultValue={user?.firstName || 'Elara'}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-input"
              defaultValue={user?.lastName || 'Williams'}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-input"
            disabled
            style={{
              background: 'var(--bg-app)',
              cursor: 'not-allowed',
              color: 'var(--text-secondary)',
            }}
            defaultValue={user?.email || 'elara.williams@example.com'}
          />
          <span
            style={{
              fontSize: '12px',
              color: 'var(--text-tertiary)',
              display: 'block',
              marginTop: '6px',
            }}
          >
            Email address can be changed in Security settings.
          </span>
        </div>
        <div
          style={{
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button className="btn btn-primary" disabled>
            <div className="spinner"></div>
            Saving changes...
          </button>
        </div>
      </div>
    </section>
  );
};
