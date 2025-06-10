type CvLeftDetailProps = {
	icon?: React.ReactNode;
	label: string;
	value: string;
};
const CvLeftDetail = ({ icon, label, value }: CvLeftDetailProps) => {
	return (
		<div className="grid">
			<div className="font-bold flex gap-2 items-center">
				{icon}
				<span>{label}</span>
			</div>
			<span className="text-sm font-thin pl-6 italic">{value}</span>
		</div>
	);
};

export default CvLeftDetail;
