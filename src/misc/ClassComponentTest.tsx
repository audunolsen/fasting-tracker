export {}

// import * as React from "react"
// import useStateObject from "~hooks/use-state-object"

// // interface State {
// //   count: number
// //   name: string
// //   null: null
// // }

// /*
//   Super interesting observations,

//   - callback accepts superflous props which aren't
//     type checked when all other properties are present

//   - callback returning functions are accepted

//   a lot of the issues seem to stem from the callback not being
//   able to properly discriminate between the two unions

//   It seems it discriminated too late (??)

//   when you write more than one property ??
// */

// class Car extends React.Component<{}, { name: string; foo: boolean }> {
//   state = {
//     foo: true,
//     name: "",
//     // bar: false,
//     // count: 0,
//     // name: "",
//     // null: null,
//   }

//   componentDidMount() {
//     this.setState({
//       foo: true,
//       // bar: false,
//     })

//     this.setState(() => ({
//       name: undefined,
//     }))

//     this.setState(() => {
//       return () => "fhjdksfhdsjk"
//     })

//     // this.setState(() => { })
//   }

//   render() {
//     return <h2>Hi, I am a Car!</h2>
//   }
// }

// function CarFn() {
//   const [state, setState] = useStateObject<State>({
//     count: 2,
//     name: "",
//     null: null,
//   })

//   React.useEffect(() => {
//     // setState(null)
//     // setState(() => ({
//     //   name: 2,
//     //   // name: 2,
//     //   // name: 2,
//     //   // name: 2,
//     //   // name: "",
//     //   // fhdjskhfdksahj: "fhdsakfhadsk",
//     //   // fdhsjkhfsdak: "hfdjskhfdjsk",
//     //   // fdsafdsa: [],
//     // }))
//     // setState(() => ({
//     //   count: 2,
//     // }))
//     // setState(() => ({
//     //   name: "",
//     // }))
//     // setState((draft) => {
//     //   draft.name = "hello"
//     // })
//     // setState.simp({ name: "" })
//     // setState({ name: "" })
//     // setState.immer(() => ({ name: "" }))
//   }, [])

//   return <h2>Hi, I am a functional Car!</h2>
// }

// interface Data {
//   name: string
//   age: number
// }

// type State = ({ ready: true } & Data) | { ready: false }

// let state: State =
//   Math.random() > 0.5
//     ? { ready: true, name: "Hello", age: 99 }
//     : { ready: false }

// if (state.ready) {
//   console.table({ 1: state.name, 2: state.age })
// }

// console.table({ 1: state.name, 2: state.age })
