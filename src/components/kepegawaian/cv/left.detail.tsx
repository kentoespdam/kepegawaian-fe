type CvLeftDetailProps = {
	icon?: React.ReactNode;
	label: string;
	value: string;
};
const CvLeftDetail = ({ icon, label, value }: CvLeftDetailProps) => {
	return (
		<div className="grid">
			<div className="flex items-center gap-2 font-bold">
				{icon}
				<span>{label}</span>
			</div>
			<div className="text-sm font-thin pl-6 italic">{value}</div>
		</div>
	);
};

export default CvLeftDetail;
