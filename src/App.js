import { useState, useEffect } from 'react'
import Form from './components/Form';
import Todo from './components/Todo';
import FilterButton from './components/FilterButton';


// 필터 조건을 가지고있는 객체 
const FILTER_MAP = {
  All: () => true, // 조건부가 true이기 때문에 모든것을 리턴한다
  Done: (task) => task.completed,
  Active: (task) => !task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

// 로컬스토리지를 동기화하는 함수
function saveDoc(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 초기 할일목록 리스트
const initialTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

export default function App() {
  // 할일 목록
  const [tasks, setTasks] = useState(initialTasks);
  // 필터
  const [filter, setFilter] = useState("All");

  // 할일 목록의 변화 상태를 추적한다
  console.log(tasks); // key state

  // 할일 목록 추가
  function addTask(name) {
    const newTask = {
      id: `todo-${Date.now()}`,
      name,
      completed: false
    }

    // 새 할일 추가
    const updatedTasks = [...tasks, newTask];

    // 로컬스토리지 동기화
    saveDoc(updatedTasks);

    setTasks(updatedTasks);
  }

  // 할일 삭제
  function deleteTask(id) {
    // tasks에서 전달받은 id와 일치하는 id를 가진 task를 제거한다
    const remainingTasks = tasks.filter(task => task.id !== id);
    // filter(callback) : 배열메서드이며, 필터링하는 메서드

    // tasks 업데이트
    setTasks(remainingTasks);

    // 로컬스토리지 동기화
    saveDoc(remainingTasks);
  }

  // 할일의 상태 변경
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // 전달받은 id와 일치하는 id를 가진 task의 completed를 현재상태의 반대값을 적용한다
      if (task.id === id) {
        return { ...task, completed: !task.completed}
      }
      // 나머지는 그대로 리턴한다
      return task;
    })

    // tasks 업데이트
    setTasks(updatedTasks);
    // 로컬 스토리지 동기화
    saveDoc(updatedTasks);
  }

  // 할일 업데이트
  function editTask(id, newName) {
    const editedTasks = tasks.map(task => {
      // 전달받은 id와 일치하는 id를 가진 task의 name을 newName으로 업데이트한다
      if (task.id === id) {
        return { ...task, name: newName};
      }
      // 나머지는 그대로 리턴한다
      return task;
    })

    // tasks 업데이트
    setTasks(editedTasks);
    // 로컬 스토리지 동기화
    saveDoc(editedTasks);
  }

  // 필터버튼
  const filterButtons = FILTER_NAMES.map(name => (
    // FilterButton 컴포넌트 재사용
    <FilterButton
      key={name}
      name={name}
      isPressed={filter === name}
      setFilter={setFilter}
    />
  ))

  // 할일 목록
  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
    // Todo 컴포넌트 재사용
    <Todo
      key={task.id}
      id={task.id}
      name={task.name}
      completed={task.completed}
      deleteTask={deleteTask}
      toggleTaskCompleted={toggleTaskCompleted}
      editTask={editTask}
    />
  ))

  return (
    <div className="max-w-sm mx-auto mt-8 border p-8 bg-white">
      <h1 className="text-2xl font-semibold text-center mb-4">할일 목록 &#128526; &#127928;</h1>

      {/* 폼 */}
      <Form addTask={addTask} />

      {/* 필터 버튼 */}
      <div className="flex flex-nowrap gap-1 mb-4">
        {filterButtons}
      </div>

      {/* 할일 목록 */}
      <h2 className="text-xl mb-4">
        <span className="font-semibold">{taskList.length}</span> 개의 할일이 있습니다
      </h2>
      <ul>
        {taskList}
      </ul>
    </div>
  )
}