import * as React from "react"
import { Temporal } from "@js-temporal/polyfill"
import styles from "./styles.module.css"

interface Props {}

export default function DatePicker() {
  return null
}

// import React, {
//   useState,
//   useEffect,
//   useMemo,
//   forwardRef,
//   useImperativeHandle,
// } from "react";
// import styles from "./styles.module.css";
// import cls from "src/common/utils/className";
// import Dt from "../../utils/Date";
// import useInert from "src/common/hooks/useInert";
// import useFirstRender from "src/common/hooks/useFirstRender";
// import ChevronLeftIcon from "src/common/assets/icons/chevron-left.svg?component";
// import ChevronRightIcon from "src/common/assets/icons/chevron-right.svg?component";

// interface Props {
//   disabled?: boolean;
//   disablePast?: boolean; // <- TODO. maybe change to or add fromDate prop (?)
//   browsePast?: boolean; // <- TODO. Allow browsing of past regardless of disabledPast (?)
//   excludeDates?: Date[];
//   initialSelectedStart?: Date;
//   initialSelectedEnd?: Date;
//   onChange?: (dates: Date | [Date, Date] | null, initial: boolean) => void;
//   className?: string;
// }

// const compareDts = (dt1: Dt, dt2: Dt): boolean => {
//   return (
//     dt1.year === dt2.year && dt1.month === dt2.month && dt1.day === dt2.day
//   );
// };

// const Picker = forwardRef<HTMLDivElement, Props>(function DatePicker(
//   {
//     disabled,
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     disablePast = true,
//     browsePast = false,
//     initialSelectedStart,
//     initialSelectedEnd,
//     excludeDates = [],
//     onChange = () => void 0,
//     className,
//   },
//   ref,
// ) {
//   const excluded = excludeDates.map((date) => new Dt(date));

//   const hasExclusion = (start?: Dt, end?: Dt) =>
//     Dt.range(start, end).some((d) => excluded.some((e) => +e == +d));

//   const [defStart, defEnd] = useMemo(() => {
//     const start = new Dt(initialSelectedStart as Date);
//     const end = new Dt((initialSelectedEnd || initialSelectedStart) as Date);

//     if (
//       // One or both is invalid
//       ![start.toJSON(), end.toJSON()].every(Boolean) ||
//       // Start is in past or end is before start
//       new Dt() > start ||
//       start > end ||
//       // Obstructed by excluded date
//       hasExclusion(start, end)
//     )
//       // Bogus default dates makes it easier to work with unary oparetor and ts typings
//       return [new Dt(-1, 0), new Dt(-2, 0)];

//     return [start, end];
//   }, []);

//   const [selectedStartDate, setSelectedStartDate] = useState(defStart);
//   const [selectedEndDate, setSelectedEndDate] = useState(
//     new Dt(defEnd).setPrevDate(),
//   );
//   const [selectedMonth, setSelectedMonth] = useState(
//     !compareDts(selectedStartDate, new Dt(-1, 0))
//       ? selectedStartDate.month
//       : new Dt().month,
//   );
//   const [selectedYear, setSelectedYear] = useState(new Dt().year);
//   const [hoveredDate, setHoveredDate] = useState(new Dt(-1, 0));
//   const firstRender = useFirstRender();

//   const [setInertRef, inertRef] = useInert(!!disabled);
//   useImperativeHandle(ref, () => inertRef.current as HTMLDivElement, []);

//   const setSingleSelected = (date?: Dt) => {
//     setSelectedStartDate(date ?? new Dt(-1, 0));
//     setSelectedEndDate(date ?? new Dt(-2, 0));
//   };

//   const firstDayOfMonth = new Dt(selectedYear, selectedMonth).day;
//   const daysInMonth = new Dt(selectedYear, selectedMonth + 1, 0).date;
//   const lastDayOfMonth = new Dt(selectedYear, selectedMonth + 1, 0).day;
//   const padStart = firstDayOfMonth == 0 ? 6 : firstDayOfMonth - 1;
//   const padEnd = lastDayOfMonth == 0 ? 0 : 7 - lastDayOfMonth;
//   const noneSelected = selectedStartDate.year < 0;
//   const singleSelected = +selectedStartDate == +selectedEndDate;
//   const rangeSelected = !noneSelected && !singleSelected;

//   const isToday = (date: number) =>
//     +new Dt() == +new Dt(selectedYear, selectedMonth, date);

//   const isExcluded = (date: number) =>
//     excluded.some((d) => +d == +new Dt(selectedYear, selectedMonth, date));

//   const isInPast = (dateNum: number) =>
//     new Dt() > new Dt(selectedYear, selectedMonth, dateNum);

//   const isSelected = (dateNum: number) => {
//     const date = new Dt(selectedYear, selectedMonth, dateNum);
//     return +selectedStartDate == +date || +selectedEndDate == +date;
//   };

//   const inSelectionRange = (dateNum: number) => {
//     const date = new Dt(selectedYear, selectedMonth, dateNum);

//     return date > selectedStartDate && date < selectedEndDate;
//   };

//   const inHoverRange = (dateNum: number) => {
//     if (!singleSelected) return false;
//     const date = new Dt(selectedYear, selectedMonth, dateNum);

//     return (
//       !hasExclusion(selectedStartDate, hoveredDate) &&
//       date > selectedStartDate &&
//       date <= hoveredDate
//     );
//   };

//   const changeMonth = (direction: "PREV" | "NEXT") => {
//     const prev = direction == "PREV" && -1;
//     const next = direction == "NEXT" && +1;
//     const variation = (prev || next) as number;

//     const changeYear =
//       (selectedMonth == 11 && next) || (selectedMonth == 0 && prev);

//     setSelectedYear((p) => (changeYear ? p + variation : p));
//     setSelectedMonth((p) => (changeYear ? (next ? 0 : 11) : p + variation));
//   };

//   const handleDateClick = (date: number) => {
//     const clickedDate = new Dt(selectedYear, selectedMonth, date);
//     const clickedExcluded = excluded.some((d) => +d == +clickedDate);
//     const clickedActive = singleSelected && +clickedDate == +selectedStartDate;

//     if (clickedExcluded || isInPast(date)) return;

//     if (noneSelected) setSingleSelected(clickedDate);
//     if (clickedActive) setSingleSelected();

//     if (singleSelected && clickedDate > selectedStartDate)
//       hasExclusion(selectedStartDate, clickedDate)
//         ? setSingleSelected(clickedDate)
//         : setSelectedEndDate(clickedDate);

//     if (singleSelected && clickedDate < selectedStartDate)
//       setSingleSelected(clickedDate);

//     if (rangeSelected) setSingleSelected(clickedDate);
//   };

//   useEffect(() => {
//     const start = new Date(selectedStartDate);
//     const end = new Date(selectedEndDate);

//     if (!noneSelected && !firstRender) {
//       onChange(singleSelected ? start : [start, end], firstRender);
//     } else if (!firstRender) {
//       onChange(null, false);
//     }
//   }, [selectedStartDate, selectedEndDate]);

//   return (
//     <div ref={setInertRef} className={cls(styles.wrapper, className)}>
//       <div className={styles.header}>
//         <button
//           className={styles.prev}
//           disabled={!(!browsePast && new Dt().month !== selectedMonth)}
//           onClick={() => changeMonth("PREV")}
//         >
//           <ChevronLeftIcon />
//         </button>
//         <h2 className={styles.month}>
//           {Dt.months({ length: undefined })[selectedMonth]} {selectedYear}
//         </h2>
//         <button className={styles.next} onClick={() => changeMonth("NEXT")}>
//           <ChevronRightIcon />
//         </button>
//       </div>

//       <div
//         className={styles.grid}
//         onMouseLeave={() => setHoveredDate(new Dt(-1, 0))}
//       >
//         {Dt.weekdays({ length: 3 }).map((day, i) => (
//           <div key={i} className={styles.weekday}>
//             {day}
//           </div>
//         ))}

//         {[...Array(padStart).keys()].reverse().map((i) => (
//           <button key={i} disabled className={styles.date}>
//             {/*
//               Showing dates surrounding selected month confuses some users. Makes
//               some think dates from surrouding months can't be selcted
//             */}
//             {/* {new Date(selectedYear, selectedMonth, 0).getDate() - i} */}
//           </button>
//         ))}

//         {[...Array(daysInMonth).keys()].map((i) => (
//           <button
//             key={i}
//             tabIndex={isInPast(i + 1) || isExcluded(i + 1) ? -1 : undefined}
//             data-date={i + 1}
//             className={cls(
//               styles.date,
//               (isInPast(i + 1) || isExcluded(i + 1)) && styles.disabled,
//               isToday(i + 1) && styles.today,
//               isSelected(i + 1) && styles.selected,
//               inSelectionRange(i + 1) && styles.selectionRange,
//               inHoverRange(i + 1) && styles.hoverRange,
//             )}
//             onClick={() => handleDateClick(i + 1)}
//             onMouseEnter={() =>
//               setHoveredDate(new Dt(selectedYear, selectedMonth, i + 1))
//             }
//           >
//             {i + 1}
//           </button>
//         ))}

//         {[...Array(padEnd).keys()].map((i) => (
//           <button key={i} disabled className={styles.date}>
//             {/* {i + 1} */}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// });

// export default Picker;
