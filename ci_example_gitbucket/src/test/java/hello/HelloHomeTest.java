package hello;

import static org.hamcrest.CoreMatchers.is;
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
		assertThat(greeter.sayHello(), is("Hello New Zealand!"));
	}

	@Test 
	public void testSayHelloZoom() {
		assertThat(greeter.sayHelloZoom(), is("Hello World via Zoom!"));
	}
}
