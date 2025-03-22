import loginBg from "../../../assets/login-bg.webp";
import LoginForm from "../components/LoginForm";

/**
 * Página de inicio de sesión.
 *
 * Muestra un formulario de inicio de sesión junto a una imagen decorativa
 * en pantallas medianas o grandes.
 *
 * @returns {JSX.Element} Página de login con diseño responsivo.
 */
export default function LoginPage() {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Sección del formulario de login */}
            <div className="flex flex-col justify-center items-center p-10 bg-white">
                <LoginForm />
            </div>

            {/* Sección de imagen decorativa (visible solo en pantallas medianas en adelante) */}
            <div
                className="hidden md:block bg-cover bg-center"
                style={{ backgroundImage: `url(${loginBg})` }}
            ></div>
        </div>
    );
}
