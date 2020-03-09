package api.entity;

public enum Role  {

    ADMIN("Admin", 0),
    SUPERUSER("SuperUser", 1),
    USER("User", 2);

    private final String desc;
    private final int priority;

    Role(String desc, int priority) {
        this.desc = desc;
        this.priority = priority;
    }

    public String getDesc() {
        return desc;
    }

    public int getPriority() {
        return priority;
    }
}
