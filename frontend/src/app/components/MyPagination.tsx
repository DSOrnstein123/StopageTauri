// const MyPagination = () => {
//   return (
//     <Pagination>
//       <PaginationContent>
//         <PaginationItem>
//           <PaginationPrevious
//             onClick={() => {
//               if (page - 1 < 1) {
//                 setPage(1);
//               } else setPage(page - 1);
//             }}
//             aria-disabled={page <= 1}
//           />
//         </PaginationItem>

//         {Array(totalPages)
//           .fill(0)
//           .map((_, index) => (
//             <PaginationItem key={index}>
//               <PaginationLink
//                 onClick={() => setPage(index + 1)}
//                 isActive={index + 1 == page}
//               >
//                 {index + 1}
//               </PaginationLink>
//             </PaginationItem>
//           ))}

//         <PaginationItem>
//           <PaginationEllipsis />
//         </PaginationItem>

//         <PaginationItem>
//           <PaginationNext
//             onClick={() => {
//               if (page + 1 > totalPages!) {
//                 setPage(totalPages!);
//               } else setPage(page + 1);
//             }}
//             aria-disabled={page >= totalPages!}
//           />
//         </PaginationItem>
//       </PaginationContent>
//     </Pagination>
//   );
// };

// export default MyPagination;
