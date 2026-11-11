import { getTodos, postTodo, updateItem } from "@/lib/api";
import { Todo } from "@/types/todo";
import { useCallback, useEffect, useState } from "react";

export default function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    //아이템 조회
    const searchTodos = useCallback( async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getTodos();
                setTodos(data);
            } catch (error) {
                console.log(error);
                alert("할 일 목록을 불러오지 못했습니다.");
            } finally {
                setIsLoading(false);
            }
        }, []);

    // 처음 화면이 열릴 때 목록 불러오기
    useEffect(() => {
        getTodos()
            .then(setTodos)
            .catch((error) => {
                console.log(error);
                alert("할 일 목록을 불러오지 못했습니다.");
            })
            .finally(() => setIsLoading(false));
    }, []);


    //아이템 등록
    const addTodo = async (name: string) => {
        try {
            const data = await postTodo(name);
            setTodos((prev) => [...prev, data]);
        } catch (error) {
            console.log(error);
            alert("할 일 등록에 실패했습니다.");
        }
    };

    //아이템 완료 토글
    const toggleTodo = async (id: number) => {
        const target = todos.find((t) => t.id === id);
        if (!target) return;

        try {
            const data = await updateItem(id, { isCompleted: !target.isCompleted });
            setTodos((prev) => prev.map((t) => (t.id === id ? data : t)));
        } catch (error) {
            console.log(error);
            alert("상태 변경에 실패했습니다.");
        }
    };

    return { todos, isLoading, error, searchTodos, addTodo, toggleTodo };
}
