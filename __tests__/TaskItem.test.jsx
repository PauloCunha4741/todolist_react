import { getByText, render } from "@testing-library/react";
import { makeServer } from "../service/mirage";
import TaskItem from "../components/TaskItem";

it("renders the TaskItem with the title provided", async () => {
    const server = makeServer();
    const task = server.create("task", { title: "My title" });

    const { getByText } = render(<TaskItem task={task} />);
    const renderedTaskTitle = getByText("My title").textContent;

    expect(renderedTaskTitle).toEqual("My title");
});