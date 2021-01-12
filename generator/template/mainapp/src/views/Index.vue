<template>
    <div class="dashboard__wrap">
        <a-row :gutter="24">
            <a-col
                :xl="24"
                :lg="24"
                :md="24"
                :sm="24"
                :xs="24"
            >
                <a-card
                    style="margin-bottom: 24px;"
                    :bordered="false"
                    title="dashboard"
                    :body-style="{ padding: 12 }"
                >
                    <div class="page-header-content">
                        <div class="avatar">
                            <a-avatar
                                :size="72"
                                :src="userInfo.avatar_url"
                            />
                        </div>
                        <div class="content">
                            <div class="content-title">
                                上午好，{{ userInfo.name }}<span class="welcome-text">，{{ welcome }}</span>
                            </div>
                            <div>前端工程师 | 欢聚堂 - 技术中心 - 中台平台</div>
                        </div>
                    </div>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                welcome: '，要不要打一把 DOTA'
            };
        },

        computed: mapGetters({
            userInfo: 'user/userInfo'
        })
    };
</script>

<style lang="scss">
.dashboard__wrap {
    margin: 24px 24px 0;

    .page-header-content {
        display: flex;
        padding: 12px;

        .avatar {
            flex: 0 1 72px;
        }

        .content {
            position: relative;
            top: 4px;
            flex: 1 1 auto;
            margin-left: 24px;
            color: rgba(0,0,0,.45);
            line-height: 22px;

            .content-title {
                margin-bottom: 12px;
                color: rgba(0,0,0,.85);
                font-weight: 500;
                font-size: 20px;
                line-height: 28px;
            }
        }
    }
}
</style>
