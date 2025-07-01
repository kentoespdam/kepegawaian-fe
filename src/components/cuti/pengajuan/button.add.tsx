"use client";
const AddPengajuanCutiButton = () => {
	const { setOpen } = usePengajuanCutiStore((state) => ({
		setOpen: state.setOpen,
	}));

	return (
		<TooltipBuilder text="Add Tunjangan" delayDuration={100}>
			<Button
				onClick={() => {
					setOpen(true);
				}}
				variant={"ghost"}
				className="text-primary hover:opacity-75"
				size={"icon"}
			>
				<PlusCircleIcon className=" h-5 w-5" />
			</Button>
		</TooltipBuilder>
	);
};

export default AddPengajuanCutiButton;
