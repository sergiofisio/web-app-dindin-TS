import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo-completo.svg";
import Logout from "../../assets/logout.svg";
import profileImg from "../../assets/profile-picture.svg";
import axios from "../../services/api";
import ModalUsuario from "../ModalUsuario";
import "./styles.scss";

type header = {
  logado: Boolean;
};

export default function Header({ logado }: header) {
  const [nomeUsuario, setNomeUsuario] = useState();
  const [modalUsuario, setModalUsuario] = useState(false);
  const navigate = useNavigate();

  const handleNomeUsuario = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`/usuario`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNomeUsuario(data.nome);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    localStorage.clear();
    navigate("/");
  };

  const handleModalUsuario = () => {
    setModalUsuario(true);
  };

  useEffect(() => {
    logado && handleNomeUsuario();
  }, [modalUsuario]);

  return (
    <div className="container-header">
      <header className={`${logado && "gradient"}`}>
        <img className="logo" src={Logo} alt="Logo do Dindin." />
        {logado && (
          <div className="profile">
            <img
              className="profile-img"
              src={profileImg}
              alt="Foto de perfil do usuário."
              onClick={handleModalUsuario}
            />
            <h1>{nomeUsuario}</h1>
            <img
              className="logout"
              src={Logout}
              alt="Efetuar logout."
              onClick={handleLogout}
            />
          </div>
        )}
      </header>
      <Outlet />
      {modalUsuario && <ModalUsuario onClose={() => setModalUsuario(false)} />}
    </div>
  );
}
