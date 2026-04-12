import { motion } from "motion/react";
import { ButtonPrimary } from "../components/Button";
import { useNavigate } from "react-router";

export function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Placeholder - navigate to onboarding
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-bg-canvas flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-[480px] bg-bg-surface rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] p-12"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-brand-default" />
          <h2 className="font-semibold text-[24px] text-brand-default">Insight Dots</h2>
        </div>

        {/* Heading */}
        <h2 className="text-[20px] font-semibold text-text-primary text-center mb-3">
          시작하기
        </h2>

        {/* Description */}
        <p className="text-[14px] font-medium text-text-secondary text-center mb-8">
          Google 계정으로 로그인하면 바로 시작할 수 있어요
        </p>

        {/* Google Login Button */}
        <ButtonPrimary onClick={handleGoogleLogin} className="w-full h-12 flex items-center justify-center gap-3">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M18.1712 8.36788H17.4998V8.33329H9.99984V11.6666H14.7095C14.0225 13.6069 12.1762 15 9.99984 15C7.23859 15 4.99984 12.7612 4.99984 9.99996C4.99984 7.23871 7.23859 4.99996 9.99984 4.99996C11.2744 4.99996 12.4342 5.48079 13.3169 6.26621L15.6744 3.90871C14.1859 2.52204 12.1952 1.66663 9.99984 1.66663C5.39775 1.66663 1.6665 5.39788 1.6665 9.99996C1.6665 14.602 5.39775 18.3333 9.99984 18.3333C14.6019 18.3333 18.3332 14.602 18.3332 9.99996C18.3332 9.44121 18.2777 8.89579 18.1712 8.36788Z" fill="#FFC107"/>
            <path d="M2.62793 6.12121L5.36543 8.12913C6.10626 6.29496 7.90043 5.00004 10.0004 5.00004C11.2754 5.00004 12.4354 5.48088 13.3179 6.26629L15.6754 3.90879C14.1867 2.52213 12.1962 1.66671 10.0004 1.66671C6.79876 1.66671 4.02376 3.47379 2.62793 6.12121Z" fill="#FF3D00"/>
            <path d="M10.0002 18.3333C12.1527 18.3333 14.1077 17.5095 15.5877 16.17L13.0085 13.9875C12.1432 14.6452 11.0865 15.0008 10.0002 15C7.83271 15 5.99188 13.6179 5.29855 11.6891L2.58105 13.7829C3.9598 16.4816 6.76105 18.3333 10.0002 18.3333Z" fill="#4CAF50"/>
            <path d="M18.1713 8.36796H17.5V8.33337H10V11.6667H14.7096C14.3809 12.5902 13.7889 13.3972 13.0067 13.9879L13.0079 13.9871L15.5871 16.1696C15.4046 16.3355 18.3333 14.1667 18.3333 10C18.3333 9.44129 18.2779 8.89587 18.1713 8.36796Z" fill="#1976D2"/>
          </svg>
          Google로 계속하기
        </ButtonPrimary>

        {/* Terms */}
        <p className="text-[12px] font-light text-text-disabled text-center mt-6 leading-[1.5]">
          계속하면 서비스 이용약관과 개인정보 처리방침에 동의하는 것으로 간주합니다
        </p>
      </motion.div>
    </div>
  );
}
