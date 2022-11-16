import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { Banner } from "../../components/Banner";
import { SearchInput } from "../../components/SearchInput";
import { Sidebar } from "../../components/SideBar";
import { useApi } from "../../libs/useApi";
import styles from "../../styles/Home.module.css";
import { Product } from "../../types/Product";
import { Tenant } from "../../types/Tenant";
import { ProductItem } from "./../../components/ProductItem/index";
import { useAppContext } from "./../../contexts/app";
import { getCookie } from 'cookies-next';
import { User } from "../../types/User";
import { useAuthContext } from "../../contexts/auth";
import { Unfounded } from "../../components/unfounded";
import Head from "next/head";

const Home = (data: Props) => {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	const { setToken, setUser } = useAuthContext();
	const { tenant, setTenant } = useAppContext();


	useEffect(() => {
		setTenant(data.tenant);
		setToken(data.token)
		if (data.user) setUser(data.user)
	}, []);

	const [products, setProducts] = useState<Product[]>(data.products);

	// Search
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
	const [searchText, setSearchText] = useState('')
	const handleSearch = (value: string) => setSearchText(value)

	useEffect(() => {
		let newFilteredProducts: Product[] = []
		for (let product of data.products) {
			if (product.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
				newFilteredProducts.push(product);
			}
		}
		setFilteredProducts(newFilteredProducts)
	}, [searchText])


	return (
		<div className={styles.container}>
			<Head>
				<title>{`${data.tenant.name}`}</title>
			</Head>
			<header className={styles.header}>
				<div className={styles.headerTop}>
					<div className={styles.headerTopLeft}>
						<div className={styles.headerTitle}>Seja Bem vindo (a)</div>
						<div className={styles.headerSubTitle}>
							O que deseja para hoje ?
						</div>
					</div>
					<div className={styles.headerTopRight}>
						<div
							className={styles.menuButton}
							onClick={() => setSidebarOpen(true)}
						>
							<div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.mainColor }}></div>
							<div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.mainColor }}></div>
							<div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.mainColor }}></div>
						</div>

						<Sidebar
							tenant={data.tenant}
							open={sidebarOpen}
							onClose={() => setSidebarOpen(false)}
						/>


					</div>
				</div>
				<div className={styles.headerBottom}>
					<SearchInput onSearch={handleSearch} />
				</div>
			</header>

			{!searchText &&
				<>
					<Banner />
					<div className={styles.grid}>
						{products.map((i, k) => (
							<ProductItem key={k} data={i} />
						))}
					</div>
				</>
			}
			{searchText &&
				<>
					<div className={styles.searchText}>
						Procurando por: <strong>{searchText}</strong>
					</div>

					{filteredProducts.length > 0 &&
						<div className={styles.grid}>
							{filteredProducts.map((i, k) => (
								<ProductItem key={k} data={i} />
							))}
						</div>
					}
					{filteredProducts.length === 0 &&
						<div className={styles.noProducts}>
							<Unfounded color={'#E0E0E0'} />
							<div className={styles.noProductsText}>Ops! Não há itens com este nome</div>
						</div>
					}
				</>
			}

		</div>
	);
};

type Props = {
	tenant: Tenant;
	products: Product[];
	token: string,
	user: User | null
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
	//const token = context.req.cookies.token;
	const token = getCookie('token', context)

	// Get Products
	const products = await api.getAllProducts();
	const user = await api.authorizeToken(token as string)
	return {
		props: {
			tenant,
			products,
			token,
			user
		},
	};
};

export default Home;
