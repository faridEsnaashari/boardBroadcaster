import ParticipantBoardPage from "../../../pages/Board/Components/ParticipantBoard";
import PresenterBoardPage from "../../../pages/Board/Components/PresenterBoard";

const routes = [
    {
        path: "/:id/participant",
        component: ParticipantBoardPage,
    },
    {
        type: "private",
        path: "/:id/presenter",
        component: PresenterBoardPage,
    },
    {
        type: "redirect",
        path: "/boards-panel",
    },
];

export default routes;
