import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const linkId = 'bootstrap-cdn-link';
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = 'https://jsdelivr.net';
      document.head.appendChild(link);
    }
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (step === 2 && timer > 0) {
      setCanResend(false);
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [step, timer]);

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); 
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const handleRequestOtp = async (e) => {
    if (e) e.preventDefault();
    setMessage('');
    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setMessage('An OTP has been sent to your email address.');
      setTimer(30); 
      setStep(2);   
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = () => {
    if (!canResend || loading) return;
    handleRequestOtp();
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }

    if (!newPassword) {
      setError('Please enter your new password.');
      return;
    }

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setMessage('Password reset successful! You can now log in.');
      
      setEmail('');
      setOtp('');
      setNewPassword('');
      setStep(1); 
    } catch (err) {
      setError('Invalid OTP code or password requirements not met.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh", paddingTop: "80px" }}>
      <div className="card p-4 shadow-sm" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-body p-0">
          
          <h3 className="text-center mb-2 text-primary fw-bold">
            {step === 1 ? 'Forgot Password?' : 'Verify OTP'}
          </h3>
          <p className="text-muted text-center small mb-4">
            {step === 1 
              ? 'Enter your email address below to receive a One-Time Password (OTP).' 
              : 'Enter the verification code sent to your email and choose a new password.'
            }
          </p>

          {error && <div className="alert alert-danger py-2 small" role="alert">{error}</div>}
          {message && <div className="alert alert-success py-2 small" role="alert">{message}</div>}

          {step === 1 && (
            <form onSubmit={handleRequestOtp}>
              <div className="mb-4">
                <label htmlFor="email" className="form-label fw-semibold text-secondary">
                  Email Address:
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-bold py-2 mb-3" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp}>
              <div className="mb-3">
                <label htmlFor="otp" className="form-label fw-semibold text-secondary">
                  Enter 6-Digit OTP:
                </label>
                <input
                  type="text"
                  id="otp"
                  className="form-control text-center fw-bold fs-5 tracking-widest"
                  placeholder="000000"
                  value={otp}
                  onChange={handleOtpChange}
                  disabled={loading}
                  required
                />
                
                <div className="text-end mt-1">
                  {canResend ? (
                    <button 
                      type="button" 
                      className="btn btn-link p-0 text-decoration-none small fw-bold text-primary"
                      onClick={handleResendOtp}
                      disabled={loading}
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <span className="text-muted small">Resend OTP in {timer}s</span>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="newPassword" className="form-label fw-semibold text-secondary">
                  New Password:
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="form-control"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-bold py-2 mb-2" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Verifying...
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>

              <button 
                type="button" 
                className="btn btn-link w-100 text-decoration-none small fw-bold text-muted mb-3" 
                onClick={() => { setStep(1); setOtp(''); }} 
                disabled={loading}
              >
                ← Back to change email
              </button>
            </form>
          )}

          <div className="text-center mt-2">
            <Link to="/login" className="text-primary fw-bold small text-decoration-none">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
