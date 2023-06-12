import ParticipantBoardPage from "../../../pages/Board/Components/ParticipantBoard";
import PresenterBoardPage from "../../../pages/Board/Components/PresenterBoard";

const routes = [
    {
        path: "/participant/:id",
        component: ParticipantBoardPage,
    },
    {
        path: "/presenter/:id",
        component: PresenterBoardPage,
    },
    {
        type: "redirect",
        path: "/boards-panel",
    },
];

export default routes;
