"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthRedirector: FC<{ children: ReactNode }> = ({ children }) => {
	const router = useRouter();
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		setMounted(true);

		if (mounted) {
			if (sessionStorage.getItem("auth-token")) {
				router.push("/");
			}
		}
	}, [mounted]);

	return <>{children}</>;
};

export default AuthRedirector;
