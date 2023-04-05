package hello;

import static org.junit.Assert.*;

import java.beans.Transient;

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
		assertEquals(greeter.sayHello(), "Hello New Zealand!");
	}

	@Test 
	public void testSayHelloZoom() {
		assertEquals(greeter.sayHelloZoom(), "Hello World via Zoom!");
	}
}
