import { useUserStore } from '@/store/user';
import { ElButton } from 'element-plus';
import HelloWorld from '@/components/HelloWorld.vue';

function clickHandle() {
    const store = useUserStore();
}

function Hello(): JSX.Element {
    return (
        <>
            <ElButton onClick={ clickHandle }>按钮</ElButton>
            <HelloWorld />
        </>
    )
}

export default Hello;