"use client"
import {
	getStatusProsesGajiValue,
	STATUS_PROSES_GAJI,
} from "@_types/enums/status_proses_gaji"
import type { PegawaiDetail } from "@_types/pegawai"
import type { GajiBatchRoot } from "@_types/penggajian/gaji_batch_root"
import type { VerifikasiSchema } from "@_types/penggajian/verifikasi"
import { Button } from "@components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu"
import { useGajiBatchRootStore } from "@store/penggajian/gaji_batch_root"
import { useGlobalMutation } from "@store/query-store"
import { DeleteIcon, EllipsisIcon, RefreshCcwIcon } from "lucide-react"
import React, { memo, useCallback, useMemo } from "react"
import { reprocessGaji } from "./action"

interface ProsesGajiTableActionProps {
	row: GajiBatchRoot
	pegawai: PegawaiDetail
	qKey: string[]
}

// Custom hook untuk encapsulate business logic
const useProsesGajiActions = (
	row: GajiBatchRoot,
	pegawai: PegawaiDetail,
	qKey: string[]
) => {
	const { setBatchId, setOpenDelete } = useGajiBatchRootStore((state) => ({
		setBatchId: state.setBatchId,
		setOpenDelete: state.setOpenDelete,
	}))

	const reprocessMutation = useGlobalMutation({
		mutationFunction: reprocessGaji,
		queryKeys: [qKey],
		refreshPage: true,
	})

	// Precompute status value
	const isFinished = useMemo(
		() =>
			getStatusProsesGajiValue(row.status) ===
			STATUS_PROSES_GAJI.FINISHED,
		[row.status]
	)

	const isMutationPending = reprocessMutation.isPending

	const prosesUlangHandler = useCallback(async () => {
		// Validasi data pegawai
		if (!pegawai?.biodata?.nama) {
			alert("Data pegawai tidak lengkap")
			return
		}

		const konfirmasi = window.confirm(
			"Apakah anda yakin ingin memproses ulang gaji ini?\n\n" +
				"Tindakan ini akan mengulang proses perhitungan gaji."
		)

		if (!konfirmasi) return

		const formData: VerifikasiSchema = {
			id: row.id,
			nama: pegawai.biodata.nama,
			jabatan: pegawai.jabatan?.nama || "",
			phase: row.status,
		}

		reprocessMutation.mutate(formData)
	}, [pegawai, row, reprocessMutation])

	const deleteHandler = useCallback(() => {
		setBatchId(row.id)
		setOpenDelete(true)
	}, [row.id, setBatchId, setOpenDelete])

	return {
		isFinished,
		isMutationPending,
		prosesUlangHandler,
		deleteHandler,
	}
}

// Komponen individual untuk menu items
const MenuItem = memo(
	({
		icon: Icon,
		text,
		onClick,
		disabled = false,
		variant = "default",
	}: {
		icon: React.ComponentType<{ className?: string }>
		text: string
		onClick: () => void
		disabled?: boolean
		variant?: "default" | "destructive"
	}) => (
		<DropdownMenuItem
			className={`
			flex cursor-pointer flex-row items-center 
			${variant === "destructive" ? "text-destructive focus:text-destructive" : "text-primary focus:text-primary"}
			${disabled ? "cursor-not-allowed opacity-50" : "hover:bg-accent"}
			transition-colors
		`}
			onClick={onClick}
			disabled={disabled}
		>
			<Icon className="mr-2 h-4 w-4 shrink-0" />
			<span className="text-sm">{text}</span>
		</DropdownMenuItem>
	)
)

MenuItem.displayName = "MenuItem"

const ProsesGajiTableAction = memo(
	({ row, pegawai, qKey }: ProsesGajiTableActionProps) => {
		const {
			isFinished,
			isMutationPending,
			prosesUlangHandler,
			deleteHandler,
		} = useProsesGajiActions(row, pegawai, qKey)

		// Disable semua action saat mutation sedang berjalan
		const isActionDisabled = isFinished || isMutationPending

		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="default"
						size="icon"
						className="h-6 w-6"
						disabled={isMutationPending}
						aria-label="Aksi proses gaji"
					>
						<EllipsisIcon className="size-4" />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					className="w-48" // Fixed width untuk konsistensi
					align="end"
				>
					<DropdownMenuGroup>
						<MenuItem
							icon={RefreshCcwIcon}
							text={
								isMutationPending
									? "Memproses..."
									: "Proses ulang"
							}
							onClick={prosesUlangHandler}
							disabled={isActionDisabled}
							variant="default"
						/>

						<MenuItem
							icon={DeleteIcon}
							text="Hapus"
							onClick={deleteHandler}
							disabled={isActionDisabled}
							variant="destructive"
						/>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
)

ProsesGajiTableAction.displayName = "ProsesGajiTableAction"

export default ProsesGajiTableAction
