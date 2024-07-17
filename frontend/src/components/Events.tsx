import { useGetMatchGoals } from "../queries";
import { Box, CircularProgress } from "@mui/material";
import { Goal } from "./Goal";
import useEmblaCarousel from "embla-carousel-react";
import { css } from "@emotion/css";

interface IEvents {
  matchId?: string;
}

export const Events = ({ matchId }: IEvents) => {
  const { data: goals, isLoading } = useGetMatchGoals(matchId);
  const [emblaRef] = useEmblaCarousel();

  if (isLoading) return <CircularProgress />;

  return (
    <Box
      className={css`
        overflow: hidden;
      `}
      ref={emblaRef}
    >
      <Box
        mt={3}
        className={css`
          display: flex;
          max-width: 90vw;
          padding: 1rem;
        `}
      >
        {goals?.map((goal) => (
          <Box
            className={css`
              flex: 0 0 300px;
              min-width: 0;
              margin-right: 1rem;
            `}
            key={goal.id}
          >
            <Goal goal={goal} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
