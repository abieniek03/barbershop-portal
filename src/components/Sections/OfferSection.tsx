"use client";

import { FC } from "react";
import Image from "next/image";

import SectionLayout from "../Layouts/SectionLayout";
import SectionTitle from "./Elements/SectionTitle";

import imageURL from "../../images/offer.jpg";
// import fetchServices from "@/utils/fetch/fetchServices";

export interface IServicesItem {
	name: string;
	price: number;
	time: number;
	info: string;
}

const OfferSection: FC = () => {
	const servicesItems: IServicesItem[] = [
		{
			name: "Strzyżenie włosów",
			price: 75,
			time: 30,
			info: "Konsultacja, mycie, strzyżenie i układanie włosów.",
		},
		{
			name: "Zarost",
			price: 60,
			time: 30,
			info: "Konsultacja i stylizacja zarostu.",
		},
		{
			name: "Golenie brzytwą",
			price: 50,
			time: 30,
			info: "Pełne golenie brzytwą.",
		},
		{
			name: "Kombo",
			price: 100,
			time: 60,
			info: "Konsultacja, mycie, strzyżenie i układanie włosów wraz ze stylizacją zarostu.",
		},
	];

	// useEffect(() => {
	// 	const fetchOfferItems = async () => {
	// 		try {
	// 			const data = await fetchServices();
	// 			setLoading(false);
	// 			setServicesItems(data);
	// 		} catch (error) {
	// 			setLoading(false);
	// 			console.error('Błąd podczas pobierania usług:', error);
	// 		}
	// 	};

	// 	fetchOfferItems();
	// }, []);

	return (
		<SectionLayout>
			<div className="lg:flex lg:items-center mb-10 lg:mb-0">
				<Image
					src={imageURL}
					width={500}
					height={200}
					alt="Picture of the author"
					className="hidden mb-10 rounded-lg lg:block lg:mb-0 lg:mr-16 w-full lg:max-w-[400px]"
				/>

				<div>
					<div className="mb-24 lg:mb-8">
						<SectionTitle title="Oferta" id="oferta" />
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nisi perspiciatis officiis, cupiditate
							eligendi ullam numquam eos reiciendis, error commodi adipisci animi quaerat nam temporibus! Pariatur ullam
							nemo ab aspernatur autem corporis maxime quibusdam temporibus! Tempora enim facere eaque suscipit eum
							cupiditate unde molestiae magni eius, necessitatibus architecto illum sunt adipisci quidem? Qui, commodi
							rem.
						</p>
					</div>
					<div className="min-h-[360px]">
						<SectionTitle title="Cennik" />
						<div className="mt-2">
							{servicesItems?.map((el, index) => (
								<div key={index} className="flex justify-between mb-8">
									<div className="max-w-[350px]">
										<p className="text-xl font-bold">{el.name}</p>
										<p className="text-sm text-gray-800 dark:text-neutral-200">{el.info}</p>
									</div>
									<p className="text-xl font-bold text-primary">{el.price}PLN</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</SectionLayout>
	);
};

export default OfferSection;
