import { deleteItem, getTodoById, updateItem, uploadImage } from "@/lib/api";
import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";

export default function useTodo(id: number) {
    const [todo, setTodo] = useState<Todo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 처음 화면이 열릴 때 상세 불러오기
    useEffect(() => {
        getTodoById(id)
            .then(setTodo)
            .catch((error) => {
                console.log(error);
                setError("할 일을 불러오지 못했습니다.");
            })
            .finally(() => setIsLoading(false));
    }, [id]);

    //아이템 수정
    const editTodo = async (item: Partial<Todo>) => {
        try {
            const data = await updateItem(id, item);
            setTodo(data);
            return true;
        } catch (error) {
            console.log(error);
            alert("수정에 실패했습니다.");
            return false;
        }
    };

    //아이템 삭제
    const removeTodo = async () => {
        try {
            await deleteItem(id);
            return true;
        } catch (error) {
            console.log(error);
            alert("삭제에 실패했습니다.");
            return false;
        }
    };

    //이미지 업로드
    const addImage = async (file: File) => {
        try {
            const url: string = await uploadImage(file);
            return url;
        } catch (error) {
            console.log(error);
            alert("이미지 업로드에 실패했습니다.");
            return null;
        }
    };

    return { todo, isLoading, error, editTodo, removeTodo, addImage };
}
