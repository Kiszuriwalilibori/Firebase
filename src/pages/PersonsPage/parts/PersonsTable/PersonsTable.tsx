import { lazy } from "react";

import Fade from "@material-ui/core/Fade";
import { PersonsTableContainer, PersonsTableBody } from "styles/style";

import PersonsTableHeader from "../Header";

const PersonsTableContent = lazy(() => import("./Body"));
const PersonsTableSortArea = lazy(() => import("./SortArea"));

export const PersonsTable = () => {
    return (
        <Fade in={true} timeout={2000}>
            <PersonsTableContainer>
                <PersonsTableHeader />
                <PersonsTableBody summary="Table of users by name and email. ID is a label only. Users are sortable by name or email alternatively and can be removed.">
                    <PersonsTableSortArea />
                    <PersonsTableContent />
                </PersonsTableBody>
            </PersonsTableContainer>
        </Fade>
    );
};

export default PersonsTable;
