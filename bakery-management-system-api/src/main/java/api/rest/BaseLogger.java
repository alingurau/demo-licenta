package api.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BaseLogger {

    public static Logger log(Class<?> clazz){
        return LoggerFactory.getLogger(clazz);
    }

}
