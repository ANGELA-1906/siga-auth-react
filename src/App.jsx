import { useState } from 'react';
import './App.css';

function App() {
  // Base de datos local en el estado de React (con usuario inicial para validación)
  const [usuariosRegistrados, setUsuariosRegistrados] = useState([
    { usuario: 'admin_siga', password: 'password123' }
  ]);

  // Estados del formulario y modo (Login vs Registro)
  const [esRegistro, setEsRegistro] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  
  // Estado para los mensajes de éxito o error
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (!usuario.trim() || !password.trim()) {
      setMensaje({ texto: 'Error: Por favor complete todos los campos.', tipo: 'error' });
      return;
    }

    if (esRegistro) {
      // LÓGICA DE REGISTRO
      const existe = usuariosRegistrados.some((u) => u.usuario === usuario);
      if (existe) {
        setMensaje({ texto: 'Error: El nombre de usuario ya está registrado.', tipo: 'error' });
      } else {
        setUsuariosRegistrados([...usuariosRegistrados, { usuario, password }]);
        setMensaje({ texto: 'Éxito: Usuario registrado correctamente. Ya puedes iniciar sesión.', tipo: 'exito' });
        setEsRegistro(false);
        setPassword('');
      }
    } else {
      // LÓGICA DE AUTENTICACIÓN (LOGIN)
      const valido = usuariosRegistrados.find(
        (u) => u.usuario === usuario && u.password === password
      );

      if (valido) {
        setMensaje({
          texto: `Éxito: Autenticación satisfactoria. Bienvenido al sistema SIGA, ${usuario}.`,
          tipo: 'exito'
        });
      } else {
        setMensaje({
          texto: 'Error: Usuario o contraseña incorrectos. Verifique sus credenciales.',
          tipo: 'error'
        });
      }
    }
  };

  const cambiarModo = () => {
    setEsRegistro(!esRegistro);
    setMensaje({ texto: '', tipo: '' });
    setUsuario('');
    setPassword('');
  };

  return (
    <div className="contenedor-principal">
      <div className="tarjeta-auth">
        <h1>SIGA</h1>
        <p className="subtitulo">Milagros Group S.A.S.</p>
        <h2>{esRegistro ? 'Registro de Usuario' : 'Iniciar Sesión'}</h2>

        <form onSubmit={manejarEnvio}>
          <div className="campo">
            <label>Usuario:</label>
            <input
              type="text"
              placeholder="Ingrese su usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

          <div className="campo">
            <label>Contraseña:</label>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-principal">
            {esRegistro ? 'Registrarme' : 'Ingresar'}
          </button>
        </form>

        {/* Mensaje dinámico de éxito o error */}
        {mensaje.texto && (
          <div className={`alerta ${mensaje.tipo}`}>
            {mensaje.texto}
          </div>
        )}

        <button type="button" className="btn-enlace" onClick={cambiarModo}>
          {esRegistro
            ? '¿Ya tienes cuenta? Inicia sesión aquí'
            : '¿No tienes cuenta? Regístrate aquí'}
        </button>
      </div>
    </div>
  );
}

export default App;