import { useState } from "react";
import { Form, Button} from "react-bootstrap";
import SkeletonForAllPages from "../GeneralComponents/SkeletonForAllPages.tsx";

const TaskForm = () => {
    const [taskName, setTaskName] = useState("");
    const [taskType, setTaskType] = useState("file");
    const [taskDeadline, setTaskDeadline] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskData = {
            taskName,
            taskType,
            taskDeadline,
        };
        console.log("Task Submitted:", taskData);
        // Add your submission logic here
    };

    return (
        <SkeletonForAllPages>
            <Form onSubmit={handleSubmit} className="p-4">
                <h3>Manage Task</h3>

                {/* Task Name Input */}
                <Form.Group className="mb-3" controlId="taskName">
                    <Form.Label>Task Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter task name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                    />
                </Form.Group>

                {/* Task Type Radio Buttons */}
                <Form.Group className="mb-3">
                    <Form.Label>Task Type</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            type="radio"
                            label="File"
                            name="taskType"
                            value="file"
                            checked={taskType === "file"}
                            onChange={(e) => setTaskType(e.target.value)}
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Link"
                            name="taskType"
                            value="link"
                            checked={taskType === "link"}
                            onChange={(e) => setTaskType(e.target.value)}
                        />
                    </div>
                </Form.Group>

                {/* Task Deadline Input */}
                <Form.Group className="mb-3" controlId="taskDeadline">
                    <Form.Label>Task Deadline</Form.Label>
                    <Form.Control
                        type="date"
                        value={taskDeadline}
                        onChange={(e) => setTaskDeadline(e.target.value)}
                        required
                    />
                </Form.Group>

                {/* Submit Button */}
                <Button variant="primary" type="submit">
                    Add Task
                </Button>
            </Form>
        </SkeletonForAllPages>
    );
};

export default TaskForm;