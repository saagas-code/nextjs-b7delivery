import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useApi } from "../../libs/useApi";
import styles from "../../styles/MyAddresses.module.css"
import { Product } from "../../types/Product";
import { Tenant } from "../../types/Tenant";
import { useAppContext } from "../../contexts/app";
import { getCookie } from 'cookies-next';
import { User } from "../../types/User";
import { useAuthContext } from "../../contexts/auth";
import Head from "next/head";
import { Header } from "../../components/Header";
import { useFormatter } from "../../libs/useFormatter";
import { CartItem } from "../../types/CartItem";
import { useRouter } from "next/router";
import { Button } from "../../components/Button";
import { Address } from "../../types/Address";
import { AddressItem } from "../../components/AddressItem";


const MyAddresses = (data: Props) => {
	const { setToken, setUser } = useAuthContext();
	const { tenant, setTenant } = useAppContext();
	const formatter = useFormatter();
	const router = useRouter();


	useEffect(() => {
		setTenant(data.tenant);
		setToken(data.token)
		if (data.user) setUser(data.user)
	}, []);

	const handleNewAddress = () => {
		router.push(`${data.tenant.slug}/newaddress`);
	}

	const handleAddressSelect = (address: Address) => {
		console.log('selecionou o end:', address.number)
	}
	const handleEdit = (id: number) => {
		console.log('Editando: ', id)
	}

	const handleDelete = (id: number) => {
		console.log('Deletando: ', id)
	}

	// Menu Events
	const [menuOpened, setMenuOpened] = useState(0)
	const handlePopupEvent = (event: MouseEvent) => {
		const tagName = (event.target as Element).tagName;
		if (!['path', 'svg'].includes(tagName)) {
			setMenuOpened(0)
		}
	}

	useEffect(() => {
		window.removeEventListener('click', handlePopupEvent);
		window.addEventListener('click', handlePopupEvent);
		return () => window.removeEventListener('click', handlePopupEvent);
	}, [menuOpened])



	return (
		<div className={styles.container}>
			<Head>
				<title>{`Meus Enderecos ${data.tenant.name}`}</title>
			</Head>

			<Header
				backHref={`/${data.tenant.slug}/checkout`}
				color={data.tenant.mainColor}
				title="Meus Enderecos"

			/>

			<div className={styles.list}>
				{data.addresses.map((i, k) => (
					<AddressItem
						key={k}
						color={data.tenant.mainColor}
						address={i}
						onSelect={handleAddressSelect}
						onEdit={handleEdit}
						onDelete={handleDelete}
						menuOpened={menuOpened}
						setMenuOpened={setMenuOpened}
					/>
				))}
			</div>

			<div className={styles.btnArea}>
				<Button
					color={data.tenant.mainColor}
					label="Novo Enderecos"
					onClick={handleNewAddress}
				/>
			</div>


		</div>
	);
};

type Props = {
	tenant: Tenant;
	products: Product[];
	token: string,
	user: User | null;
	addresses: Address[]
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { tenant: tenantSlug } = context.query;
	const api = useApi(tenantSlug as string);

	// Get Tenant
	const tenant = await api.getTenant();
	if (!tenant) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	//get logged user
	const token = getCookie('token', context)
	const user = await api.authorizeToken(token as string)
	if (!user) {
		return { redirect: { destination: '/login', permanent: false } }
	}

	// Get My Addresses
	const addresses = await api.getUserAddresses(user.email);

	return {
		props: {
			tenant,
			token,
			user,
			addresses
		},
	};
};

export default MyAddresses;
