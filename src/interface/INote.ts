export default interface Note {
	id: number;
	note: string;
	title: string;
	createdAt: string;
	updatedAt: string;
	status: "Todo" | "Completed" | "Inprogress";
}
