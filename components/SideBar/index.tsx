import styles from "./styles.module.css";
import { useAuthContext } from './../../contexts/auth/hook';
import { Button } from "../Button";
import { Tenant } from "../../types/Tenant";
import { SidebarMenuItem } from './../SidebarMenuItem/index';
import { useRouter } from "next/router";

type Props = {
    tenant: Tenant
    open: boolean
    onClose: () => void
}

export const Sidebar = ({ tenant, open, onClose }: Props) => {
    const { user, setToken } = useAuthContext();

    const router = useRouter()

    return (
        <div
            className={styles.container}
            style={{
                width: open ? '100vw' : '0'
            }}
        >
            <div className={styles.area}>
                <div className={styles.header}>
                    <div
                        className={styles.loginArea}
                        style={{ borderColor: tenant.mainColor }}
                    >
                        {user &&
                            <div className={styles.userInfo}>
                                <strong>{user.name}</strong>
                                Ultimo pedido há X semanas
                            </div>
                        }
                        {!user &&
                            <Button
                                color={tenant.mainColor}
                                label="Fazer Login"
                                onClick={() => { router.push(`/${tenant.slug}/login`) }}
                                fill
                            />
                        }
                    </div>
                    <div
                        className={styles.close}
                        style={{ color: tenant.mainColor }}
                        onClick={onClose}
                    >x</div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.menu}>
                    <SidebarMenuItem
                        color={'#6A7D8B'}
                        icon="cart"
                        label="Cardápio"
                        onClick={onClose}
                    />
                    <SidebarMenuItem
                        color={'#6A7D8B'}
                        icon="menu"
                        label="Sacola"
                        onClick={() => { router.push(`/${tenant.slug}/cart`) }}
                    />
                    <SidebarMenuItem
                        color={'#6A7D8B'}
                        icon="fav"
                        label="Favoritos"
                        onClick={() => { }}
                        disabled
                    />
                    <SidebarMenuItem
                        color={'#6A7D8B'}
                        icon="order"
                        label="Meus Pedidos"
                        onClick={() => { router.push(`/${tenant.slug}/orders`) }}
                    />
                    <SidebarMenuItem
                        color={'#6A7D8B'}
                        icon="config"
                        label="Configuracoes"
                        onClick={() => { }}
                        disabled
                    />
                </div>
                {user &&
                    <div className={styles.menuButton}>
                        <SidebarMenuItem
                            color={'#6A7D8B'}
                            icon="logout"
                            label="Sair"
                            onClick={() => {
                                setToken('');
                                onClose();
                            }}
                        />
                    </div>
                }
            </div>
        </div>
    )
}