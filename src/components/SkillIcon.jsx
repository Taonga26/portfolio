import { iconRegistry } from "../utils/iconRegistry";


function SkillIcon({
    icon,
    className = ""
}) {

    const Icon =
        iconRegistry[icon];


    if (!Icon) {
        return null;
    }


    return (
        <Icon
            className={className}
        />
    );

}


export default SkillIcon;