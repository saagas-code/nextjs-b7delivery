import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Banner } from "../../components/Banner";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { InputField } from "../../components/InputField";
import { SearchInput } from "../../components/SearchInput";
import { useApi } from "../../libs/useApi";
import styles from "../../styles/Register.module.css";
import { Tenant } from "../../types/Tenant";
import { ProductItem } from "../../components/ProductItem/index";
import { useAppContext } from "./../../contexts/app";

const Register = (data: Props) => {
  const { tenant, setTenant } = useAppContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setTenant(data.tenant);
  }, []);

  const router = useRouter();

  const handleSubmit = () => { };

  const handleSignup = () => {
    router.push(`/${data.tenant.slug}/signup`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{`Registro ${data.tenant.name}`}</title>
      </Head>
      <Header
        color={data.tenant.mainColor}
        backHref={`/${data.tenant.slug}/login`}
      />

      <div className={styles.header}>{data.tenant.name}</div>

      <div
        className={styles.subTitle}
        style={{ borderColor: data.tenant.mainColor }}
      >
        Preencha os campos para criar o seu cadastro
      </div>
      <div className={styles.line}></div>

      <div className={styles.formArea}>
        <div className={styles.inputArea}>
          <InputField
            color={data.tenant.mainColor}
            placeholder="Digite seu nome"
            value={name}
            onChange={setName}
          />
        </div>

        <div className={styles.inputArea}>
          <InputField
            color={data.tenant.mainColor}
            placeholder="Digite seu e-mail"
            value={email}
            onChange={setEmail}
          />
        </div>

        <div className={styles.inputArea}>
          <InputField
            color={data.tenant.mainColor}
            placeholder="Digite sua senha"
            value={password}
            onChange={setPassword}
            password
          />
        </div>

        <div className={styles.inputArea}>
          <Button
            color={data.tenant.mainColor}
            label="Cadastrar"
            onClick={handleSubmit}
            fill
          />
        </div>
      </div>

      <div
        className={styles.forgetArea}
        style={{ borderColor: data.tenant.mainColor }}
      >
        J?? tem cadastro?{" "}
        <Link
          style={{ color: data.tenant.mainColor }}
          className={styles.link}
          href={`/${data.tenant.slug}/login`}
        >
          Fazer Login
        </Link>
      </div>
    </div>
  );
};

type Props = {
  tenant: Tenant;
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

  return {
    props: {
      tenant,
    },
  };
};

export default Register;
