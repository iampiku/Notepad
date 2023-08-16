export default interface Note {
	note: string;
	title: string;
	createdAt: string;
	status: "Todo" | "Completed" | "Inprogress";
}
