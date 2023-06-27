import { useState } from "react";

export default function Form({addTask}) {
    // 추가할 새 할일의 이름
    const [name, setName] = useState("");

    // 제출 처리 함수
    function handleSubmit(e) {
        e.preventDefault();

        addTask(name);

        // 할일 입력란을 비운다
        setName("");
    }

    return (
        <form className="mb-4" onSubmit={handleSubmit}>
            <input
            type="text"
            className="border p-2 w-full mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)} // name 업데이트(name 입력)
            autoComplete="off"
            />
            <button
            type="submit"
            className="p-1 w-full disabled:opacity-50 bg-blue-500 text-white font-semibold"
            disabled={!name.trim()} // name이 없음=true=disabled상태가 됨, name 업데이트(name 입력)=false
            >
            {/* trim(): 문자의 앞, 뒤 공백 제거 */}
            추가하기
            </button>
        </form>
    )
}