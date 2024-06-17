import { InputBox } from "./BulletinBoard"

type MessageThreadProps = {
    parentId: number;
};

export function MessageThread({parentId}: MessageThreadProps) {
    return (
    <InputBox parentId={parentId}/>
    );
}