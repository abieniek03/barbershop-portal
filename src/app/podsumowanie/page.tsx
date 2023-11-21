"use client";
import { FC, useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Layout from "@/components/Layouts/Layout";
import SectionTitle from "@/components/Sections/Elements/SectionTitle";
import Modal from "@/components/Modals/Modal";
import LoadingButton from "@/components/Buttons/LoadingButton";

import { formatFullDate } from "@/utils/formatDate";
import { IVisitData } from "@/components/WeekSlider/WeekSlider";

import axios from "@/axiosInstance";

import globalStyles from "@/styles/global";

const SaveVisitPage: FC = () => {
	const router = useRouter();
	const [mounted, setMounted] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [visitData, setVisitData] = useState<IVisitData>();
	const [successfullModal, setSuccessfullModal] = useState<boolean>(false);

	const saveVisit = () => {
		const userID = sessionStorage.getItem("user-id");
		setLoading(true);

		axios
			.post("/visits/save", { ...visitData, userID })
			.then(() => {
				setSuccessfullModal(true);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	};

	useEffect(() => {
		if (!sessionStorage.getItem("visit-data") || !sessionStorage.getItem("auth-token")) {
			router.push("/");
		}
		setMounted(true);
		if (mounted) {
			setVisitData(JSON.parse(sessionStorage.getItem("visit-data") || ""));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mounted, visitData]);

	return (
		<>
			<Navbar />
			<Layout>
				<div className="py-32">
					<SectionTitle title="Podsumowanie" />

					<div className="flex justify-center items-center">
						<div>
							<p className="text-lg font-bold">{visitData?.service}</p>
							<p>
								Termin: {formatFullDate(new Date(visitData?.date || "Jun 20 2023"))}, {visitData?.hour}
							</p>
							<p className="mt-2 uppercase">Płatność kartą lub gotówką w salonie.</p>
							<div className="flex justify-center items-center my-2">
								{loading ? (
									<LoadingButton label="Potwierdzanie..." />
								) : (
									<button onClick={saveVisit} className={globalStyles.buttonPrimary + " w-full"}>
										Potwierdź
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
				<Modal visible={successfullModal} title="Zostałeś zapisany">
					<div className="max-w-md text-center">
						<p>Twoja wyzyta została zarejestrowana. Pamiętaj o przybyciu do salonu w wyznaczonym terminie.</p>
						<p className="text-lg font-bold mt-2 mb-4">Do zobaczenia!</p>
						<a href="/" className={globalStyles.buttonPrimary}>
							OK
						</a>
					</div>
				</Modal>
			</Layout>
		</>
	);
};

export default SaveVisitPage;
