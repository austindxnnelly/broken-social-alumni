package hello;

import static org.junit.Assert.*;
import org.junit.Test;
import org.junit.Before;

public class HelloHomeTest {

	private Greeter greeter;

	@Before
	public void setUp(){
		greeter = new Greeter();
	}

	@Test
	public void testHelloWorld(){
	}


}
