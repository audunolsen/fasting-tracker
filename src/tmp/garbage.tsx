export {}

{
  /* <form onSubmit={handleSubmit}>
<Input
  label="New friend"
  name="friend"
  required
  pattern="[A-Za-z]+"
  invalidText="invalid"
  // validationStrategy="debounced"
/>
</form>

{state.name}
<br />

{state.friends.map((e, i) => (
<p key={i} id={e.name}>
  {e.name}, {e.age}
</p>
))}

<button onClick={() => setState(null, true)}>change name</button> */
}

// interface State {
//   name: string
//   friends: [
//     {
//       name: string
//       age: number
//     }
//   ]
// }
// const [state, setState] = useStateObject<State>({
//   name: "audun",
//   friends: [
//     {
//       name: "",
//       age: 0,
//     },
//   ],
// })

// React.useEffect(() => {
//   console.log(createRoutes())
// }, [])

// async function handleSubmit(e: FormEvent<HTMLFormElement>) {
//   e.preventDefault()
//   assertElement(HTMLFormElement, e.target)

//   const fields = formFields(e.target)

//   setState.immer((draft) => {
//     draft.friends.push({
//       name: fields.friend ?? "",
//       age: 67486483,
//     })
//   })

//   e.target.reset()
// }
