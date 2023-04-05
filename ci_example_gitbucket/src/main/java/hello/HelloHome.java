package hello;

import org.joda.time.LocalTime;

/**
 *
 *
 * We cannot travel abroad yet, how can we say hello to the world?!
 *
 *
 */
public class HelloHome {

	public static void main(String[] args){
		LocalTime currentTime = new LocalTime();
		Greeter greeter = new Greeter();
		System.out.println(greeter.sayHello() + " at " + currentTime);
	}
}
