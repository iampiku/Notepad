export default interface Note {
	title: string;
	note: string;
	status: "Todo" | "Completed" | "Inprogress";
	createdAt: string;
}
