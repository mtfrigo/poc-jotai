import { ConnectionPanels } from "../../model/panels.schema";
import { ConnectionPanelsDto } from "../dto/panels.dto";


export const mapConnectionPanels = (data: ConnectionPanelsDto): ConnectionPanels => {
    return data.panels
}